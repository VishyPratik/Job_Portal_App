import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
     
        applicants: [],
        
    },
    reducers: {
        setAllApplications: (state, action) => {
            state.applicants = action.payload
        },
       /* setAllCompany: (state, action) => {
            state.companies = action.payload
        },
        setSearchCompany: (state, action) => {
            state.companyText = action.payload
        },
        setSearchJob: (state, action) => {
            state.jobText = action.payload
        },*/
    }
})
export const { setAllApplications } = applicationSlice.actions;
export default applicationSlice.reducer;