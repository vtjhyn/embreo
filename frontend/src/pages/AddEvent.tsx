import { useEffect } from "react";
import EventForm, { EventFieldType } from "../components/form/EventForm";
import { getVendors } from "../store/slice/vendorSlice";
import { useAppDispatch, useAppSelector } from "../utils/hook";
import { sessionGet } from "../utils/session";
import { getProgram } from "../store/slice/programSlice";
import { addEvent, getEventByHR } from "../store/slice/eventSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const AddEvent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: vendorlist } = useAppSelector((state) => state.vendor);
  const { data: programList } = useAppSelector((state) => state.program);

  const user = sessionGet("user");
  const userId = user?.id;

  useEffect(() => {
    dispatch(getVendors());
    dispatch(getProgram());
  }, []);

  const onFinish = (data: EventFieldType) => {
    data.companyId = userId;

    data.proposedDates1 = new Date(data.proposedDates1).toISOString();
    data.proposedDates2 = new Date(data.proposedDates2).toISOString();
    data.proposedDates3 = new Date(data.proposedDates3).toISOString();

    dispatch(addEvent(data)).then((result) => {
      if (result.payload) {
        dispatch(getEventByHR(userId)).then(() => {
          message.success(
            "Success add event, please wait few seconds...",
            2,
            () =>
              navigate("/", {
                replace: true,
              })
          );
        });
      }
    });
    console.log(data)
  };
  return (
    <div className="h-full flex justify-center items-center">
      <EventForm
        user={user}
        vendorList={vendorlist}
        programList={programList}
        onFinish={onFinish}
      />
    </div>
  );
};

export default AddEvent;
