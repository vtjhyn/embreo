import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";
import { sessionSet } from "../../utils/session";
import { FieldType } from "../../components/form/LoginForm";

export interface UserProps {
  user?: {
    id: string;
    company: string;
    username: string;
  };
  token?: string;
}

export const loginUser = createAsyncThunk<any, FieldType>(
  "auth/loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/login`, payload);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface AuthStateProps {
  data: UserProps | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: AuthStateProps = {
  data: null,
  isLoading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;

      const { hashedPassword, ...userData } = action.payload.user;
      state.data = userData;

      sessionSet("token", action.payload.token, 720);
      sessionSet("user", userData, 720);
    });
  },
});

export default authSlice.reducer;
