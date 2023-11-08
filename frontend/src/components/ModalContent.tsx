import { Tag } from "antd";
import { DataType } from "./EventTable";
import VendorOption from "./VendorOption";

interface ModalContentProps {
  modalData?: DataType;
  role: String;
}

const ModalContent: React.FC<ModalContentProps> = ({ modalData, role }) => {
  return (
    <div>
      <p>Event Name: {modalData?.eventName}</p>
      <p>Vendor Name: {modalData?.vendorName}</p>
      <p>Purposed Dates:</p>
      <ul>
        {modalData?.confirmedDate.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
      <p>
        Status:{" "}
        <span>
          <Tag
            color={
              modalData?.status === "PENDING"
                ? "yellow"
                : modalData?.status === "REJECTED"
                ? "red"
                : "green"
            }
          >
            {modalData?.status}
          </Tag>
        </span>
      </p>
      <p>Date Created: {modalData?.dateCreated}</p>
      {role && role === 'Vendor' && (
        <VendorOption data={modalData?.confirmedDate} />
      )}
    </div>
  );
};

export default ModalContent;
