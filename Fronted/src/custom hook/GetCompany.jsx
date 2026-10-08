import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
//import { setAllJobs } from "../redux/JobSlice";
import { setSingleCompany } from '../redux/CompanySlice';
//console.log(companyId)
const GetCompany=(companyId)=> {
    const dispatch = useDispatch()
    //console.log(companyId)
    //const {  } = useSelector((state) => state.job);
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/company/get/${companyId}`, { withCredentials: true })
                dispatch(setSingleCompany(result.data.company));
            }
            catch (error) {
                console.log(error.message);
            }
        }
        fetchCompany();
    }, [companyId, dispatch])
    
}


export default GetCompany
