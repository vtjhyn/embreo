import { useMemo } from "react";
import { Input, Button, Form, Select } from "antd";
import { VendorProps } from "../../store/slice/vendorSlice";
import { UserProps } from "../../store/slice/authSlice";

export interface EventFieldType {
  companyId: string;
  eventId: string;
  proposedDates1: Date;
  proposedDates2: Date;
  proposedDates3: Date;
  type?: string;
}

interface EventFormProps {
  onFinish?: (data: EventFieldType) => void;
  isLoading?: boolean;
  user: UserProps["user"];
  vendorList: VendorProps[];
}

const EventForm: React.FC<EventFormProps> = ({
  onFinish,
  isLoading,
  user,
  vendorList,
}) => {
  const vendors = useMemo(
    () => vendorList?.map((item) => ({ label: item.name, value: item.id })),
    [vendorList]
  );
  const options = [
    {
      label: "a",
      value: "a",
    },
    {
      label: "b",
      value: "b",
    },
  ];

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ minWidth: 500 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item label="Company" name="companyId" initialValue={user?.id}>
        <div className="text-lg font-bold">{user?.company}</div>
      </Form.Item>

      <Form.Item
        label="Event Name"
        name="eventId"
        rules={[{ required: true, message: "Please input event name!" }]}
      >
        <Select options={options} />
      </Form.Item>

      <Form.Item
        label="Date Option 1"
        name="proposedDates1"
        rules={[
          { required: true, message: "Please input your Date Option 1!" },
        ]}
      >
        <Input type="date" />
      </Form.Item>

      <Form.Item
        label="Date Option 2"
        name="proposedDates2"
        rules={[
          { required: true, message: "Please input your Date Option 2!" },
        ]}
      >
        <Input type="date" />
      </Form.Item>

      <Form.Item
        label="Date Option 3"
        name="proposedDates3"
        rules={[
          { required: true, message: "Please input your Date Option 3!" },
        ]}
      >
        <Input type="date" />
      </Form.Item>

      <Form.Item
        label="Location"
        name="locationId"
        rules={[
          { required: true, message: "Please input your event location!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Vendor Name"
        name="vendorId"
        rules={[{ required: true, message: "Please input event vendor name!" }]}
      >
        <Select options={vendors} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
