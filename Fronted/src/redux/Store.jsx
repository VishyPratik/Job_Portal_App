import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./UserSlice"
import jobSlice from "./JobSlice"
import companySlice from "./CompanySlice"
import applicationSlice from "./ApplicationSlice"
export const store = configureStore({
   reducer: {
        user: userSlice,
        job: jobSlice,
        company: companySlice,
        application: applicationSlice,
    }
})