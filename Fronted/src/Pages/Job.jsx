import React from 'react'
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router"

function Job({ job }) {

    const navigate = useNavigate();

    const dayAgo = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const different = currentTime - createdAt;

        return Math.floor(
            different / (1000 * 60 * 60 * 24)
        );
    }

    return (

        <div className="w-full">

            <div className="
                w-full
                min-h-[340px]
                sm:min-h-[350px]
                border
                rounded-xl
                flex
                flex-col
                gap-3
                border-gray-100
                p-4
                sm:p-5
                shadow-lg
                cursor-pointer
                transition-transform
                duration-300
                hover:scale-[1.02]
            ">


                <div className="flex justify-between items-center">

                    <p className="text-sm text-gray-600 font-semibold">
                        {dayAgo(job?.createdAt) === 0
                            ? "Today"
                            : `${dayAgo(job?.createdAt)} day ago`
                        }
                    </p>

                    <button
                        className="
                            h-9
                            w-9
                            sm:h-10
                            sm:w-10
                            shrink-0
                            rounded-full
                            border
                            border-gray-100
                            shadow-lg
                            flex
                            justify-center
                            items-center
                            text-xl
                        "
                    >
                        <CiBookmark />
                    </button>

                </div>



                <div>

                    <p className="
                        text-xl
                        sm:text-2xl
                        font-bold
                        uppercase
                        truncate
                    ">
                        {job?.company?.name}
                    </p>

                    <p className="
                        text-base
                        sm:text-lg
                        text-gray-600
                        font-semibold
                        truncate
                    ">
                        {job?.location}
                    </p>

                </div>



                <div>

                    <p className="
                        text-lg
                        sm:text-xl
                        font-bold
                        line-clamp-1
                    ">
                        {job?.title}
                    </p>

                </div>



                <div className="flex-1">

                    <p className="
                        text-sm
                        sm:text-[16px]
                        text-gray-600
                        font-semibold
                        line-clamp-3
                    ">
                        {job?.description}
                    </p>

                </div>


                <div className="
                    flex
                    flex-row
                    flex-wrap
                    gap-2
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
                        <p className="text-blue-600 text-xs sm:text-sm font-semibold">
                            {job?.position}
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
                        <p className="text-red-600 text-xs sm:text-sm font-semibold">
                            {job?.jobType}
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
                        <p className="text-violet-600 text-xs sm:text-sm font-semibold">
                            {job?.salary}
                        </p>
                    </div>

                </div>



                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-2
                    sm:gap-3
                    mt-1
                ">

                    <button
                        className="
                            h-9
                            w-full
                            sm:w-20
                            border
                            border-gray-100
                            rounded
                            cursor-pointer
                            shadow
                            text-base
                            sm:text-[18px]
                            font-semibold
                            hover:bg-gray-100
                        "
                        onClick={() => navigate(`/description/${job?._id}`)}
                    >
                        Details
                    </button>

                    <button
                        className="
                            h-9
                            w-full
                            sm:w-30
                            bg-violet-500
                            rounded
                            cursor-pointer
                            shadow
                            text-white
                            font-semibold
                            hover:bg-violet-600
                        "
                    >
                        Save For Later
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Job