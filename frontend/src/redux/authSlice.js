import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setSavedJobs } from "./savedJobsSlice";
import { USER_API_END_POINT } from "@/constants/constant";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    User: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.User = action.payload;
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;



export const fetchSavedJobs = () => async (dispatch) => {
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          console.error("User not logged in, no token found.");
          return;
      }

      console.log("Fetching saved jobs with token:", token); // Debugging log

      const response = await axios.get(`${USER_API_END_POINT}/bookmarked`, {
          headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Saved Jobs Response:", response.data); // Debugging log
      dispatch(setSavedJobs(response.data.savedJobs));
  } catch (error) {
      console.error("Error fetching saved jobs:", error);
      if (error.response) {
          console.error("Response Data:", error.response.data); // Debugging log
          console.error("Response Status:", error.response.status); // Debugging log
      }
  }
};

