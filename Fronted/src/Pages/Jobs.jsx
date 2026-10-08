import React from 'react'
import Job from "./Job"
import FilterJobs from '../component/FilterJobs'
import { useSelector } from 'react-redux';

function Jobs() {

    const { allJobs, filteredJobs } = useSelector((state) => state.job);

    const jobsToShow = filteredJobs ?? allJobs;

    return (
        <div className="mt-16 md:mt-20 px-3 sm:px-5 md:px-8">

            <div className="flex flex-col md:flex-row gap-5 md:gap-8">


                <div className="w-full md:w-60 lg:w-64 shrink-0">
                    <FilterJobs />
                </div>


                <div className="flex-1">

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-4
                        md:gap-5
                    ">

                        {
                            jobsToShow?.length === 0
                                ? (
                                    <div className="text-xl sm:text-2xl font-bold col-span-full text-center py-10">
                                        Job not Found
                                    </div>
                                )
                                : (
                                    jobsToShow.map((job, index) => (
                                        <Job
                                            key={job._id || index}
                                            job={job}
                                        />
                                    ))
                                )
                        }

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Jobs