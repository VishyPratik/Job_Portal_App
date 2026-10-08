import React from 'react'
import { useSelector } from 'react-redux';
import Job from './Job';
import getAllJobs from '../custom hook/GetAllJobs';

function Browse() {

    getAllJobs();

    const { allJobs } = useSelector((state) => state.job);

    return (
        <div className="mt-16 md:mt-20 px-3 sm:px-5 md:px-8">

            <div className="flex flex-col gap-6">


                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        Search Result ({allJobs?.length || 0})
                    </h1>
                </div>


                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-4
                    md:gap-6
                ">

                    {
                        allJobs?.length === 0 ? (
                            <div className="text-xl sm:text-2xl font-bold col-span-full text-center py-10">
                                No Job Available
                            </div>
                        ) : (
                            allJobs?.map((job, index) => (
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
    )
}

export default Browse