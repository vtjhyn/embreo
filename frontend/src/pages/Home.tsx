import { useState, useEffect } from "react";
import { Button, Modal, Spin } from "antd";
import EventTable from "../components/EventTable";
import ModalContent from "../components/ModalContent";
import { sessionGet } from "../utils/session";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/hook";
import {
  EventProps,
  getEventByHR,
  getEventByVendor,
} from "../store/slice/eventSlice";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<EventProps | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: events, isLoading } = useAppSelector((state) => state.event);

  console.log(events);

  const user = sessionGet("user");
  const userId = user?.id;
  const role = user?.role;

  useEffect(() => {
    if (role && role === "HR") {
      dispatch(getEventByHR(userId));
    }
    if (role && role === "Vendor") {
      dispatch(getEventByVendor(userId));
    }
  }, [role]);

  const onView = (data: EventProps) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    navigate("/addevent");
  };

  return isLoading ? (
    <div className="h-screen flex justify-center items-center">
      <Spin />
    </div>
  ) : (
    <div className="flex justify-center gap-2 pt-[80px]">
      {role === "HR" && (
        <Button
          type="primary"
          className="w-[120px] h-[40px] rounded-xl mb-2"
          onClick={handleClick}
        >
          Add Event
        </Button>
      )}
      <EventTable onView={onView} eventData={events} loading={isLoading} />
      <Modal
        title="Event Detail"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        classNames={{ header: "text-center", content: "" }}
        footer={null}
      >
        {modalData && (
          <ModalContent
            role={role}
            modalData={modalData}
            close={handleCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default Home;
