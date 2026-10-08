import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setAllAdminJob } from "../redux/JobSlice";

const GetAllAdminJob = () => {
    const dispatch = useDispatch()
    //const { alljobs } = useSelector((state) => state.job);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/job/getAdminJob`, { withCredentials: true })
                dispatch(setAllAdminJob(result.data.jobs));
            }
            catch (error) {
                console.log(error.message);
            }
        }
        fetchUser();
    }, [dispatch])
}

export default GetAllAdminJob;