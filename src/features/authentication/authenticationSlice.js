import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/api_details";
import jwt_decode from "jwt-decode";

export const loginUser = createAsyncThunk(
  "authetication/loginUser",
  async ({ username, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/users/login`, {
        username,
        password,
      });
      if (data.success) {
        return fulfillWithValue(data);
      }
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    login: JSON.parse(localStorage.getItem("login")) || {
      token: "",
      _id: "",
      username: "",
    },
    error: "",
    status: "",
  },
  reducers: {
    logoutButtonPressed: (state) => {
      state.login = { token: "", _id: "", username: "" };
      localStorage.clear();
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      const token = action.payload.token;
      const decodedValue = jwt_decode(token);
      const login = {
        token: `Bearer ${token}`,
        username: decodedValue.username,
        _id: decodedValue._id,
        name: decodedValue.name,
      };
      localStorage.setItem("login", JSON.stringify(login));
      state.login = login;
      state.status = "fulfilled";
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "rejected";
    },
  },
});

export const { logoutButtonPressed } = authenticationSlice.actions;
export default authenticationSlice.reducer;
