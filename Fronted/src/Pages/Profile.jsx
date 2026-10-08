import React, { useState } from 'react'
import { FaPen } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaMobileScreen } from "react-icons/fa6";
import AppliesJobs from '../component/AppliesJobs';
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';
import dp from "../assets/dp.jpg"

function Profile() {

    const [open, setOpen] = useState(false);

    const { userData } = useSelector((state) => state.user);

    return (
        <div className="min-h-screen flex flex-col gap-5 px-3 sm:px-5 md:px-8">


            <div className="flex justify-center mt-16 md:mt-10">

                <div className="
                    w-full
                    max-w-4xl
                    border
                    p-4
                    sm:p-5
                    border-gray-100
                    rounded
                    shadow-lg
                    flex
                    flex-col
                    gap-4
                ">


                    <div className="flex flex-col sm:flex-row justify-between gap-4">

                        <div className="flex flex-row gap-3">

                            <img
                                src={userData?.user?.image || dp}
                                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover shrink-0"
                            />

                            <div className="min-w-0">

                                <p className="text-lg sm:text-xl font-semibold break-words">
                                    {userData?.user?.fullname}
                                </p>

                                <p className="
                                    mt-1
                                    text-sm
                                    sm:text-[16px]
                                    text-gray-600
                                    font-medium
                                    break-words
                                ">
                                    {userData?.user?.profile?.bio}
                                </p>

                            </div>

                        </div>


                        <div
                            className="
                                h-9
                                w-10
                                shrink-0
                                rounded
                                border
                                border-gray-100
                                shadow-lg
                                flex
                                justify-center
                                items-center
                                cursor-pointer
                                self-end
                                sm:self-start
                            "
                            onClick={() => setOpen(true)}
                        >
                            <FaPen />
                        </div>

                    </div>



                    <div className="flex flex-row items-center gap-3 break-all">

                        <MdOutlineMail className="text-xl shrink-0" />

                        <p>
                            {userData?.user?.email}
                        </p>

                    </div>



                    <div className="flex flex-row items-center gap-3">

                        <FaMobileScreen className="text-xl shrink-0" />

                        <p>
                            +91{userData?.user?.phoneNumber}
                        </p>

                    </div>



                    <h1 className="text-[19px] font-medium">
                        Skills
                    </h1>

                    <div className="flex flex-wrap gap-2 sm:gap-3">

                        {userData?.user?.profile?.skills?.map((item, index) => (

                            <button
                                key={index}
                                className="
                                    min-h-7
                                    px-3
                                    py-1
                                    rounded
                                    bg-black
                                    text-white
                                    text-sm
                                    sm:text-base
                                "
                            >
                                {item}
                            </button>

                        ))}

                    </div>

                </div>

            </div>



            <div className="mt-5 sm:mt-10 w-full overflow-x-auto">

                <AppliesJobs />

            </div>



            {open && (
                <div className="
                    fixed
                    inset-0
                    z-50
                    flex
                    items-center
                    justify-center
                    px-3
                    sm:px-5
                ">

                    <EditProfile
                        open={open}
                        setOpen={setOpen}
                    />

                </div>
            )}

        </div>
    )
}

export default Profile