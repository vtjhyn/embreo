import { useState } from "react";
import { Button, Modal } from "antd";
import EventTable, { DataType } from "../components/EventTable";
import ModalContent from "../components/ModalContent";
import { sessionGet } from "../utils/session";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<DataType | null>(null);
  const navigate = useNavigate();

  const user = sessionGet("user");
  const role = user?.role;

  const onView = (data: DataType) => {
    console.log(data);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    navigate("/addevent");
  };

  return (
    <div className="flex flex-col">
      {role === "HR" && (
        <Button
          type="primary"
          className="w-[120px] h-[40px] rounded-xl mb-2"
          onClick={handleClick}
        >
          Add Event
        </Button>
      )}
      <EventTable onView={onView} />
      <Modal
        title="Event Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        classNames={{ header: "text-center", content: "" }}
        footer={null}
      >
        {modalData && <ModalContent role={role} modalData={modalData} />}
      </Modal>
    </div>
  );
};

export default Home;
