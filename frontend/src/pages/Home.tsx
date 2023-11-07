import { useState } from "react";
import { Modal } from "antd";
import EventTable, { DataType } from "../components/EventTable";
import ModalContent from "../components/ModalContent";
import { sessionGet } from "../utils/session";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<DataType | null>(null);


  const user = sessionGet('user')
  const role = user?.role
  console.log(role, "<<<")

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

  return (
    <div>
      <EventTable onView={onView} />
      <Modal
        title="Event Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        {modalData && <ModalContent role={role} modalData={modalData} />}
      </Modal>
    </div>
  );
};

export default Home;
