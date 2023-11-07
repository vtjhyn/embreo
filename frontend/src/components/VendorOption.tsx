import React from "react";
import { Input, Select, Tabs } from "antd";
import type { TabsProps } from "antd";

interface VendorOptionProps {
  data?: String[];
}

const VendorOption: React.FC<VendorOptionProps> = ({ data }) => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const options = data?.map((data) => data);
  console.log(options);

  const items: TabsProps["items"] = [
    {
      key: "approve",
      label: "APPROVE",
      children: (
        <div className="flex flex-col items-center justify-center text-center">
          <div>Choose confirm date</div>
          <Select
            style={{ width: 300 }}
            options={data && data.map((item) => ({ label: item, value: item }))}
          />
        </div>
      ),
    },
    {
      key: "reject",
      label: "REJECT",
      children: (
        <div className="flex flex-col items-center justify-center text-center">
          <div>Input reason</div>
          <Input />
        </div>
      ),
    },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      centered
      size="large"
      type="card"
      items={items}
      onChange={onChange}
    />
  );
};

export default VendorOption;
