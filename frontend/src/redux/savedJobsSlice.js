import { createSlice } from "@reduxjs/toolkit";

const savedJobsSlice = createSlice({
    name: "savedJobs",
    initialState: {
        savedJobs: [],
    },
    reducers: {
        setSavedJobs: (state, action) => {
            state.savedJobs = action.payload;
        },
        addJob: (state, action) => {
            state.savedJobs.push(action.payload);
        },
        removeJob: (state, action) => {
            state.savedJobs = state.savedJobs.filter((job) => job._id !== action.payload);
        },
        clearSavedJobs: (state) => {
            state.savedJobs = [];
        },
    },
});

export const { setSavedJobs, addJob, removeJob, clearSavedJobs } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;