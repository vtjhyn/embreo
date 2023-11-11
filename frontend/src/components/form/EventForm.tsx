import { useMemo, useState, useRef, useEffect } from "react";
import { Input, Button, Form, Select, Divider, Space, List, InputRef } from "antd";
import { VendorProps } from "../../store/slice/vendorSlice";
import { UserProps } from "../../store/slice/authSlice";
import { PlusOutlined } from "@ant-design/icons";
import { ProgramProps, addProgram } from "../../store/slice/programSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import PlacesAutocomplete from "react-places-autocomplete";

export interface EventFieldType {
  companyId: string;
  nameId: string;
  proposedDates1: Date | string;
  proposedDates2: Date | string;
  proposedDates3: Date | string;
  location: string;
}

interface EventFormProps {
  onFinish?: (data: EventFieldType) => void;
  user: UserProps["user"];
  vendorList: VendorProps[];
  programList: ProgramProps[];
}

const EventForm: React.FC<EventFormProps> = ({
  onFinish,
  user,
  vendorList,
  programList,
}) => {
  const dispatch = useAppDispatch();
  const [dataProgram, setDataProgram] = useState<ProgramProps[]>([]);
  const eventLoading = useAppSelector((state) => state.event.isLoading);
  const programLoading = useAppSelector((state) => state.program.isLoading);
  const [autocompleteValue, setAutocompleteValue] = useState<string>("");
  const handleSelect = (value: string) => {
    setAutocompleteValue(value);
  };
  const handleInputChange = (value: string) => {
    setAutocompleteValue(value);
  };
  const vendors = useMemo(
    () => vendorList?.map((item) => ({ label: item.name, value: item.id })),
    [vendorList]
  );
  useEffect(() => {
    setDataProgram(programList);
  }, [programList]);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    if (!name) return;
    e.preventDefault();
    dispatch(addProgram({ name: name })).then((result) => {
      if (result.payload) {
        const newProgram = result.payload;
        setDataProgram([...programList, newProgram]);
        setName("");
        inputRef.current?.focus();
      }
    });
    setName("");
    inputRef.current?.focus();
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      className="w-[600px] shadow-xl px-6 pt-6 pb-2 rounded-3xl bg-slate-300"
      layout="vertical"
    >
      <Form.Item label="Company" name="companyId" initialValue={user?.id}>
        <div className="text-lg font-bold ">{user?.company}</div>
      </Form.Item>

      <Form.Item
        label="Event Name"
        name="nameId"
        rules={[{ required: true, message: "Please input event name!" }]}
      >
        <Select
          placeholder="Please input your event name"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <Input
                placeholder="Please enter item"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={addItem}
                className="w-full"
                loading={programLoading}
              >
                Add item
              </Button>
            </>
          )}
          options={dataProgram.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
        />
      </Form.Item>

      <Space.Compact block>
        <Space size={58}>
          <Form.Item
            label="Date Option 1"
            name="proposedDates1"
            rules={[
              { required: true, message: "Please input your Date Option 1!" },
            ]}
            className="w-full"
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="Date Option 2"
            name="proposedDates2"
            rules={[
              { required: true, message: "Please input your Date Option 2!" },
            ]}
            className="w-full"
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="Date Option 3"
            name="proposedDates3"
            rules={[
              { required: true, message: "Please input your Date Option 3!" },
            ]}
            className="w-full "
          >
            <Input type="date" />
          </Form.Item>
        </Space>
      </Space.Compact>

      <Form.Item
        label="Location"
        name="location"
        rules={[
          { required: true, message: "Please input your Date Option 2!" },
        ]}
        className="w-full "
      >
        <PlacesAutocomplete onChange={handleInputChange}>
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <>
              <Input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
                value={autocompleteValue}
                onSelect={() => handleSelect}
              />
              <div className="max-h-[100px] overflow-y-scroll">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => (
                  <List
                    {...getSuggestionItemProps(suggestion)}
                    key={suggestion.placeId}
                    size="small"
                    bordered
                    className="bg-slate-200"
                  >
                    <List.Item>{suggestion.description}</List.Item>
                  </List>
                ))}
              </div>
            </>
          )}
        </PlacesAutocomplete>
      </Form.Item>

      <Form.Item
        label="Vendor Name"
        name="vendorId"
        rules={[{ required: true, message: "Please input event vendor name!" }]}
      >
        <Select options={vendors} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 18 }}>
        <Button type="primary" htmlType="submit" loading={eventLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
