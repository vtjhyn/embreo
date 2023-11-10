import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, message } from "antd";
import {
  EventProps,
  eventApprovement,
  getEventByVendor,
} from "../store/slice/eventSlice";
import uniqueKey from "../utils/uniqueKey";
import { useAppDispatch } from "../utils/hook";
import { sessionGet } from "../utils/session";

interface VendorOptionProps {
  data?: EventProps;
  close: () => void;
}

const VendorOption: React.FC<VendorOptionProps> = ({ data, close }) => {
  const user = sessionGet("user");
  const userId = user?.id;
  const [activeOption, setActiveOption] = useState<"APPROVE" | "REJECT" | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [remarks, setRemarks] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(activeOption);
  }, [activeOption]);

  const handleApprove = () => {
    setActiveOption("APPROVE");
  };

  const handleReject = () => {
    setActiveOption("REJECT");
  };

  const handleChange = (value: any) => {
    setSelectedDate(value);
  };

  const handleRemarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemarks(e.target.value);
  };

  const handleSubmit = () => {
    const payload: any = {};
    payload.id = data?.id;
    if (activeOption === "APPROVE") {
      payload.status = activeOption;
      payload.confirmedDate = selectedDate;
    }
    if (activeOption === "REJECT") {
      payload.status = activeOption;
      payload.remarks = remarks;
    }
    console.log(payload, "<<cek");
    dispatch(eventApprovement(payload)).then((result) => {
      if (result.payload) {
        message.success(`Success ${activeOption} item`, 2, () => close());
        dispatch(getEventByVendor(userId));
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-8 justify-center items-center w-full">
        <Button
          className={`w-full  ${
            activeOption === "APPROVE"
              ? "bg-green-600 text-white"
              : "bg-white text-green-600"
          }`}
          onClick={handleApprove}
        >
          APPROVE
        </Button>
        <Button
          className={`w-full  ${
            activeOption === "REJECT"
              ? "bg-red-600 text-white"
              : "bg-white text-red-600"
          }`}
          onClick={handleReject}
        >
          REJECT
        </Button>
      </div>
      {activeOption === null ? null : activeOption === "APPROVE" ? (
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <div>Choose confirm date</div>
          <Form.Item className="w-[300px]">
            <Select onChange={handleChange}>
              <Select.Option
                value={data?.proposedDates1}
                key={`${uniqueKey()}`}
              >
                {data?.proposedDates1.split("T")[0]}
              </Select.Option>
              <Select.Option
                value={data?.proposedDates2}
                key={`${uniqueKey()}`}
              >
                {data?.proposedDates2.split("T")[0]}
              </Select.Option>
              <Select.Option
                value={data?.proposedDates3}
                key={`${uniqueKey()}`}
              >
                {data?.proposedDates3.split("T")[0]}
              </Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <div>Input reason</div>
          <Form.Item className="w-full">
            <Input value={remarks} onChange={handleRemarksChange} />
          </Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default VendorOption;
