import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export interface ProgramProps {
  id: string;
  name: string;
  events: [];
}

export const getProgram = createAsyncThunk(
  "program/getProgram",
  async (_, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/programs`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProgram = createAsyncThunk<any, any>(
  "program/addProgram",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/programs`, payload);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface ProgramStateProps {
  data: ProgramProps[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ProgramStateProps = {
  data: [],
  isLoading: false,
  error: undefined,
};

const programSLice = createSlice({
  name: "program",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProgram.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProgram.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getProgram.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(addProgram.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProgram.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(addProgram.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export default programSLice.reducer;
