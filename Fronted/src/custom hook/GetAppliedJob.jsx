import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setAllAppliedJob } from "../redux/JobSlice";

const GetAppliedJob = () => {
    const dispatch = useDispatch()
    const { alljobs } = useSelector((state) => state.job);
    useEffect(() => {
        const fetchAppliedJob = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/applicant/applied`, { withCredentials: true })
                //console.log("result is :",result.data);
                dispatch(setAllAppliedJob(result.data.applications));
               // console.log(result.data);
                
            }
            catch (error) {
                console.log(error.message);
            }
        }
        fetchAppliedJob();
    }, [])
}

export default GetAppliedJob;
