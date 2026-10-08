import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setAllJobs } from "../redux/JobSlice";

const getAllJobs = () => {
    const dispatch = useDispatch()
    const { searchText } = useSelector((state) => state.job);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/job/getAllJob?keyword=${searchText}`, { withCredentials: true })
                dispatch(setAllJobs(result.data.jobs));
            }
            catch (error) {
                console.log(error.message);
            }
        }
        fetchUser();
    }, [dispatch])
}

export default getAllJobs;