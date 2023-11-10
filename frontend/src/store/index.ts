import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import vendorReducer from "./slice/vendorSlice";
import programReducer from "./slice/programSlice";
import eventReducer from "./slice/eventSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vendor: vendorReducer,
    program: programReducer,
    event: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
