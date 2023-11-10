import React from "react";
import { Button, Flex, Space, Table, Tag } from "antd";
import { EventProps } from "../store/slice/eventSlice";

const { Column } = Table;

interface EventTableProps {
  onView: (data: EventProps) => void;
  eventData: EventProps[];
  loading: boolean;
}

const EventTable: React.FC<EventTableProps> = ({
  onView,
  eventData,
  loading,
}) => {
  return (
    loading === false && (
      <Table
        dataSource={eventData}
        loading={false}
        bordered
        rowKey={(item) => item.id}
        className="w-[800px]"
        pagination={{ pageSize: 5 }}
        scroll={{ y: 480 }}
      >
        <Column
          title="Event Name"
          render={(item) => item.name.name}
          align="center"
        />
        <Column
          title="Vendor Name"
          render={(item) => item.vendor.name}
          align="center"
        />
        <Column
          title="Proposed Date"
          align="center"
          render={(item) =>
            item.confirmedDate ? (
              <Tag color="geekblue">{item.confirmedDate.split("T")[0]}</Tag>
            ) : (
              <Flex vertical align="center" gap="small" justify="center">
                <Tag color="magenta">{item.proposedDates1.split("T")[0]}</Tag>
                <Tag color="geekblue">{item.proposedDates2.split("T")[0]}</Tag>
                <Tag color="purple">{item.proposedDates3.split("T")[0]}</Tag>
              </Flex>
            )
          }
        />
        <Column
          title="Status"
          align="center"
          render={(item) => (
            <Tag
              color={
                item.status === "PENDING"
                  ? "yellow"
                  : item.status === "REJECT"
                  ? "red"
                  : item.status === "APPROVE"
                  ? "green"
                  : "gray"
              }
              className="font-bold"
            >
              {item.status}
            </Tag>
          )}
        />
        <Column
          title="Date Created"
          render={(item) => item.createdAt.split("T")[0]}
          align="center"
        />

        <Column
          title="Action"
          key="action"
          align="center"
          render={(record: EventProps) => (
            <Space size="middle">
              <Button type="primary" onClick={() => onView(record)}>
                View
              </Button>
            </Space>
          )}
        />
      </Table>
    )
  );
};

export default EventTable;
