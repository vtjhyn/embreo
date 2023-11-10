import React, { useState, useEffect } from "react";
import { Tag } from "antd";
import VendorOption from "./VendorOption";
import { EventProps } from "../store/slice/eventSlice";

interface ModalContentProps {
  modalData?: EventProps;
  role: String;
  close: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({
  modalData,
  role,
  close,
}) => {
  const [data, setData] = useState<EventProps>();
  useEffect(() => {
    setData(modalData);
  }, [modalData]);
  return (
    <div>
      <p>Event Name: {data?.name.name}</p>
      <p>Vendor Name: {data?.vendor.name}</p>
      <p>Purposed Dates:</p>
      <ul>
        <li>{data?.proposedDates1.split("T")[0]}</li>
        <li>{data?.proposedDates2.split("T")[0]}</li>
        <li>{data?.proposedDates3.split("T")[0]}</li>
      </ul>
      {data?.confirmedDate && (
        <p>Confirmed Date: {data?.confirmedDate.split("T")[0]}</p>
      )}
      <p>
        Status:{" "}
        <span>
          <Tag
            color={
              data?.status === "PENDING"
                ? "yellow"
                : data?.status === "REJECT"
                ? "red"
                : "green"
            }
          >
            {data?.status}
          </Tag>
        </span>
      </p>
      {data?.remarks && <p>Reason: {data.remarks}</p>}
      <p>Date created: {data?.createdAt.split("T")[0]}</p>
      {role && role === "Vendor" && data?.status === "PENDING" && (
        <VendorOption data={data} close={close} />
      )}
    </div>
  );
};

export default ModalContent;
