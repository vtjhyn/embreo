import React from "react";
import { Button, Flex, Space, Table, Tag } from "antd";

const { Column } = Table;

export interface DataType {
  key: React.Key;
  eventName: string;
  vendorName: string;
  confirmedDate: string[];
  status: string;
  dateCreated: string;
}

const data: DataType[] = [
  {
    key: "1",
    eventName: "Chairity",
    vendorName: "Vendor A",
    confirmedDate: ["2023-11-12", "2023-11-13", "2023-11-14"],
    status: "PENDING",
    dateCreated: new Date().toDateString(),
  },
  {
    key: "2",
    eventName: "Donation",
    vendorName: "Vendor B ",
    confirmedDate: ["2023-10-22", "2023-10-23", "2023-10-24"],
    status: "APPROVED",
    dateCreated: new Date().toDateString(),
  },
];

const EventTable = ({ onView }: { onView: (data: DataType) => void }) => {
  // const onView = (data: any) => {
  //   console.log(data);
  // };
  return (
    <Table dataSource={data} loading={false} bordered>
      <Column title="Event Name" dataIndex="eventName" align="center" />
      <Column title="Vendor Name" dataIndex="vendorName" align="center" />
      <Column
        title="ConFirmed Date"
        dataIndex="confirmedDate"
        align="center"
        render={(tags: string[]) => (
          <Flex vertical align="center" gap="small" justify="center">
            {tags.map((tag, index) => (
              <Tag color="geekblue" key={index}>
                {tag}
              </Tag>
            ))}
          </Flex>
        )}
      />
      <Column
        title="Status"
        dataIndex="status"
        align="center"
        render={(status: string) => (
          <Tag
            color={
              status === "PENDING"
                ? "yellow"
                : status === "REJECTED"
                ? "red"
                : status === "APPROVED"
                ? "green"
                : "gray"
            }
            className="font-bold"
          >
            {status}
          </Tag>
        )}
      />
      <Column title="Date Created" dataIndex="dateCreated" align="center" />

      <Column
        title="Action"
        key="action"
        align="center"
        render={(record: DataType) => (
          <Space size="middle">
            <Button type="primary" onClick={() => onView(record)}>
              View
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default EventTable;
