import React, { useState, useMemo } from "react";
import { Button, Input, Select } from "antd";

interface VendorOptionProps {
  data?: String[];
}

const VendorOption: React.FC<VendorOptionProps> = ({ data }) => {
  const [activeOption, setActiveOption] = useState<"APPROVE" | "REJECT" | null>(
    null
  );

  const options = useMemo(
    () => data?.map((item) => ({ label: item, value: item })),
    [data]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-8 justify-center items-center w-full">
        <Button
          className={`w-full  ${
            activeOption === "APPROVE"
              ? "bg-green-600 text-white"
              : "bg-white text-green-600"
          }`}
          onClick={() => setActiveOption("APPROVE")}
        >
          Approve
        </Button>
        <Button
          className={`w-full  ${
            activeOption === "REJECT"
              ? "bg-red-600 text-white"
              : "bg-white text-red-600"
          }`}
          onClick={() => setActiveOption("REJECT")}
        >
          reject
        </Button>
      </div>
      {activeOption === null ? null : activeOption === "APPROVE" ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div>Choose confirm date</div>
          <Select
            style={{ width: 300 }}
            options={options}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <div>Input reason</div>
          <Input />
        </div>
      )}
    </div>
  );
};

export default VendorOption;
