import React from 'react'
import { useNavigate } from 'react-router'

function LatestJobCard({ job }) {
    const navigate = useNavigate();
    return (
        <div>
            <div className="
                h-auto
                min-h-48
                w-full
                sm:w-95
                border
                border-gray-100
                p-3
                flex
                flex-col
                gap-2
                rounded
                shadow-lg
                cursor-pointer
                transition-transform duration-300 hover:scale-105
            "
                onClick={() => navigate(`/description/${job._id}`)}
            >

                <div>
                    <h3 className="text-lg sm:text-2xl font-bold uppercase">
                        {job?.company?.name}
                    </h3>
                </div>

                <div>
                    <p className="text-gray-700 text-sm sm:text-base">
                        {job?.location}
                    </p>
                </div>

                <div>
                    <h3 className="text-lg sm:text-xl font-bold">
                        {job.title}
                    </h3>
                </div>

                <div>
                    <p className="text-gray-700 font-medium text-sm sm:text-base">
                        {job.description}
                    </p>
                </div>


                <div className="flex flex-row flex-wrap gap-2">

                    <div className="
                        h-7
                        px-3
                        border border-gray-200
                        rounded-full
                        flex justify-center items-center
                    ">
                        <p className="text-blue-600 text-sm font-semibold">
                            {job.position}
                        </p>
                    </div>

                    <div className="
                        h-7
                        px-3
                        border border-gray-200
                        rounded-full
                        flex justify-center items-center
                    ">
                        <p className="text-red-600 text-sm font-semibold">
                            {job.jobType}
                        </p>
                    </div>

                    <div className="
                        h-7
                        px-3
                        border border-gray-200
                        rounded-full
                        flex justify-center items-center
                    ">
                        <p className="text-violet-600 text-sm font-semibold">
                            {job.salary}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default LatestJobCard