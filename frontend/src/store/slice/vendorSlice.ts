import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export interface VendorProps {
  id: string;
  name: string;
}

export const getVendors = createAsyncThunk(
  "vendor/getVendors",
  async (_, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/vendors`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface VendorStateProps {
  data: VendorProps[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: VendorStateProps = {
  data: [],
  isLoading: false,
  error: undefined,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVendors.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVendors.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getVendors.fulfilled, (state, action) => {
      state.isLoading = false;
      const filteredData = action.payload.map((vendor: any) => {
        const { username, hashedPassword, events, role, ...vendorData } = vendor;
        return vendorData;
      });
      state.data = filteredData;
    });
  },
});

export default vendorSlice.reducer;
