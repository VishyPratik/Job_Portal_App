import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { serverUrl } from '../main';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/JobSlice';

function Description() {

    const [isdisable, setIsdisable] = useState(false);

    const { singleJob } = useSelector((state) => state.job);

    const params = useParams();
    const jobId = params.id;

    const dispatch = useDispatch();

    // Get Single Job
    useEffect(() => {

        const fetchJob = async () => {

            try {

                const result = await axios.get(
                    `${serverUrl}/api/job/getjob/${jobId}`,
                    {
                        withCredentials: true
                    }
                );

                dispatch(setSingleJob(result.data.job));

            } catch (error) {

                console.log(error.message);

            }

        }

        fetchJob();

    }, [jobId, dispatch]);


    // Check Already Applied
    useEffect(() => {

        const checkApplied = async () => {

            try {

                const result = await axios.get(
                    `${serverUrl}/api/applicant/applied`,
                    {
                        withCredentials: true
                    }
                );

                const applied = result.data.applications.some(
                    (application) => application.job?._id === jobId
                );

                setIsdisable(applied);

            } catch (error) {

                console.log(error);

            }

        };

        checkApplied();

    }, [jobId]);


    // Apply Job
    const applyJob = async () => {

        try {

            const result = await axios.post(
                `${serverUrl}/api/applicant/apply/${jobId}`,
                {},
                {
                    withCredentials: true
                }
            );

            if (result.data.success) {
                setIsdisable(true);
            }

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 mt-16 md:mt-20">


            <div className="
                flex
                flex-col
                md:flex-row
                justify-between
                items-start
                md:items-center
                gap-6
            ">


                <div>

                    <h1 className="text-2xl sm:text-3xl font-bold">
                        {singleJob?.title}
                    </h1>

                    <div className="
                        flex
                        flex-wrap
                        gap-2
                        sm:gap-4
                        mt-4
                    ">


                        <div className="
                            min-h-7
                            px-3
                            py-1
                            border
                            border-gray-200
                            rounded-full
                            flex
                            justify-center
                            items-center
                        ">
                            <p className="text-blue-600 text-sm font-semibold">
                                {singleJob?.position}
                            </p>
                        </div>



                        <div className="
                            min-h-7
                            px-3
                            py-1
                            border
                            border-gray-200
                            rounded-full
                            flex
                            justify-center
                            items-center
                        ">
                            <p className="text-red-600 text-sm font-semibold">
                                {singleJob?.jobType}
                            </p>
                        </div>



                        <div className="
                            min-h-7
                            px-3
                            py-1
                            border
                            border-gray-200
                            rounded-full
                            flex
                            justify-center
                            items-center
                        ">
                            <p className="text-violet-600 text-sm font-semibold">
                                {singleJob?.salary}
                            </p>
                        </div>

                    </div>

                </div>



                <div className="w-full md:w-auto">

                    <button
                        onClick={!isdisable ? applyJob : undefined}
                        disabled={isdisable}
                        className={`
                            h-10
                            w-full
                            md:w-36
                            rounded-lg
                            ${isdisable
                                ? "bg-gray-600 cursor-not-allowed text-white font-semibold"
                                : "bg-blue-500 text-white font-semibold cursor-pointer hover:bg-violet-500"
                            }
                        `}
                    >
                        {isdisable ? "Already Applied" : "Apply"}
                    </button>

                </div>

            </div>



            <div className="mt-8">

                <h1 className="
                    text-xl
                    sm:text-2xl
                    font-bold
                    break-words
                ">
                    {singleJob?.description}
                </h1>

                <div className="h-0.5 w-full bg-gray-800 mt-4"></div>



                <div className="mt-5 flex flex-col gap-4">


                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">

                        <span className="text-[16px] sm:text-[17px] font-semibold">
                            Role:
                        </span>

                        <p className="text-[16px] sm:text-[17px] text-gray-800 break-words">
                            {singleJob?.title}
                        </p>

                    </div>


                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">

                        <span className="text-[16px] sm:text-[17px] font-semibold">
                            Location:
                        </span>

                        <p className="text-[16px] sm:text-[17px] text-gray-800 break-words">
                            {singleJob?.location}
                        </p>

                    </div>



                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">

                        <span className="text-[16px] sm:text-[17px] font-semibold">
                            Salary:
                        </span>

                        <p className="text-[16px] sm:text-[17px] text-gray-800">
                            {singleJob?.salary}
                        </p>

                    </div>


                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">

                        <span className="text-[16px] sm:text-[17px] font-semibold">
                            Experience:
                        </span>

                        <p className="text-[16px] sm:text-[17px] text-gray-800">
                            {singleJob?.experience}
                        </p>

                    </div>



                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">

                        <span className="text-[16px] sm:text-[17px] font-semibold">
                            Job Type:
                        </span>

                        <p className="text-[16px] sm:text-[17px] text-gray-800">
                            {singleJob?.jobType}
                        </p>

                    </div>



                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">

                        <span className="text-[16px] sm:text-[17px] font-semibold">
                            Total Applicants:
                        </span>

                        <p className="text-[16px] sm:text-[17px] text-gray-800">
                            {singleJob?.applications?.length || 0}
                        </p>

                    </div>



                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">

                        <span className="text-[16px] sm:text-[17px] font-semibold">
                            Posted Date:
                        </span>

                        <p className="text-[16px] sm:text-[17px] text-gray-800">
                            {singleJob?.createdAt
                                ? singleJob.createdAt.split("T")[0]
                                : "-"
                            }
                        </p>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Description