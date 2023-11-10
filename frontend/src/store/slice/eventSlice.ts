import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export interface EventProps {
  id: string;
  companyId: string;
  proposedDates1: string;
  proposedDates2: string;
  proposedDates3: string;
  location: string;
  nameId: string;
  status: string;
  remarks?: string;
  confirmedDate?: string;
  vendorId: string;
  createdAt: string;
  company: {
    company: string;
  };
  name: {
    name: string;
  };
  vendor: {
    name: string;
  };
}

export const getEventByHR = createAsyncThunk<any, any>(
  "event/getEventByHR",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/event/hr/${payload}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getEventByVendor = createAsyncThunk<any, any>(
  "event/getEventByVendor",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/event/vendor/${payload}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addEvent = createAsyncThunk<any, any>(
  "event/addEvent",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/addevent`, payload);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const eventApprovement = createAsyncThunk<any, any>(
  "event/eventApprovement",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.patch(
        `/approvement/${payload.id}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface EventStateProps {
  data: EventProps[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: EventStateProps = {
  data: [],
  isLoading: false,
  error: undefined,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventByHR.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEventByHR.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getEventByHR.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.events;
    });
    builder.addCase(getEventByVendor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEventByVendor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getEventByVendor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.events;
    });
    builder.addCase(addEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(eventApprovement.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(eventApprovement.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(eventApprovement.fulfilled, (state) => {
      state.isLoading = false;
      // state.data = action.payload;
    });
  },
});

export default eventSlice.reducer;
