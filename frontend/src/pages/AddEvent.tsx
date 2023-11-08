import { useEffect } from "react";
import EventForm, { EventFieldType } from "../components/form/EventForm";
import { getVendors } from "../store/slice/vendorSlice";
import { useAppDispatch, useAppSelector } from "../utils/hook";
import { sessionGet } from "../utils/session";

const AddEvent = () => {
  const dispatch = useAppDispatch();
  const { data: vendorlist } = useAppSelector((state) => state.vendor);

  const user = sessionGet("user");
  console.log(vendorlist);

  useEffect(() => {
    dispatch(getVendors());
  }, []);

  const handleSubmit = (data: EventFieldType) => {
    console.log(data);
  };
  return (
    <div>
      <EventForm user={user} vendorList={vendorlist} onFinish={handleSubmit} />
    </div>
  );
};

export default AddEvent;
