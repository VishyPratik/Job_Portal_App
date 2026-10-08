import React, { useEffect } from 'react'
import { setAllCompany } from '../redux/CompanySlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../main'

function GetAllCoompany() {
    const dispatch = useDispatch()
    //console.log(companyId)
    //const {  } = useSelector((state) => state.job);
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/company/getCompany`, { withCredentials: true })
                dispatch(setAllCompany(result.data.companies));
            }
            catch (error) {
                console.log(error.message);
            }
        }
        fetchCompany();
    }, [])
}

export default GetAllCoompany
