import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies:[],
        companyText: "",
        jobText:"",
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        setAllCompany: (state, action) => {
            state.companies = action.payload
        },
        setSearchCompany: (state, action) => {
            state.companyText = action.payload
        },
        setSearchJob: (state, action) => {
            state.jobText = action.payload
        },
    }
})
export const { setSingleCompany, setAllCompany, setSearchCompany, setSearchJob } = companySlice.actions;
export default companySlice.reducer;