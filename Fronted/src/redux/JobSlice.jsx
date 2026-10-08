import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        allAppliedJobs: [],
        searchText: "",
        filteredJobs: null,
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJob: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setAllAppliedJob: (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setFilteredJobs: (state, action) => {
            state.filteredJobs = action.payload;
        },
    }
})
export const { setAllJobs, setSingleJob, setAllAdminJob, setAllAppliedJob, setSearchText, setFilteredJobs } = jobSlice.actions;
export default jobSlice.reducer;