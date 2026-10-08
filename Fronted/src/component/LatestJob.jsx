import React from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux';

function LatestJob() {
    //const randomJob = [1, 2, 3, 4, 5, 6];
    const { allJobs } = useSelector((state) => state.job)
    // console.log(allJobs)
    //const jobsToShow = filteredJobs ?? allJobs;
    return (
        <div className="mt-8 md:mt-20 px-4 md:ml-30">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center md:text-left">
                <span className="text-violet-600">Latest & Top</span> Job Openings
            </h1>

            <div className="flex flex-wrap justify-center md:justify-start gap-5 mt-5">
                {
                    allJobs.length==0?(<div className='text-2xl font-bold'>No Jobs Available</div>):
                    (allJobs.map((job, index) => (
                        <LatestJobCard
                            job={job}
                            key={index}
                        />
                    )))
                }
            </div>

        </div>
    )
}

export default LatestJob
