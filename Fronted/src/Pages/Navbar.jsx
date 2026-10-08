import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from "react-redux"
import { LuUserRound } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { serverUrl } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setUserData } from '../redux/UserSlice';
import dp from "../assets/dp.jpg"
function Navbar() {
    const { userData } = useSelector((state) => state.user);
    //console.log("role is  ", userData?.user?.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const logoutHandle = async () => {
        try {

            let result = await axios.get(`${serverUrl}/api/user/logout`,

                {
                    withCredentials: true
                })
            // console.log(result.data);
            toast.success("Logout Successfully...")
            dispatch(setUserData(null));
            navigate("/login");

        }
        catch (error) {
            console.log(error.message);
            console.log(error.response?.data);
            // setErr(error.response.data.message);
            // setErr(error.response.data.message);
        }
    }
    return (
        <div className="w-full">

            <div className="flex flex-col md:flex-row md:justify-center md:items-center mt-6 px-5 md:gap-100 ">


                <div>
                    <h1 className="text-2xl font-bold text-center">
                        Job<span className="text-red-500">Portal</span>
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-22 mt-4 md:mt-0">

                    {
                        userData && userData?.user?.role === "Recruiter" ? (
                            <div>
                                <ul className="flex flex-row gap-5 text-[16px] md:text-[19px] font-bold">

                                    <Link to="/admin/companies">
                                        <li>Companies</li>
                                    </Link>

                                    <Link to="/admin/jobs">
                                        <li>Jobs</li>
                                    </Link>



                                </ul>
                            </div>
                        ) : (
                            <div>
                                <ul className="flex flex-row gap-5 text-[16px] md:text-[19px] font-bold">

                                    <Link to="/">
                                        <li>Home</li>
                                    </Link>

                                    <Link to="/jobs">
                                        <li>Jobs</li>
                                    </Link>

                                    <Link to="/browse">
                                        <li>Browse</li>
                                    </Link>

                                </ul>
                            </div>
                        )
                    }

                    <div>
                        {
                            !userData ? (
                                <div className="flex gap-3 justify-center items-center text-[14px] md:text-[16px] font-semibold">

                                    <Link to="/login">
                                        <button className="h-9 md:h-10 px-4 border border-gray-100 rounded cursor-pointer hover:bg-blue-700 hover:text-white shadow-lg">
                                            Login
                                        </button>
                                    </Link>

                                    <Link to="/signup">
                                        <button className="h-9 md:h-10 px-4 border border-gray-100 rounded cursor-pointer hover:bg-blue-700 hover:text-white shadow-lg">
                                            Signup
                                        </button>
                                    </Link>

                                </div>) : (
                                <div className="ml-10 relative">
                                    <div
                                        onClick={() => setShow(prev => !prev)}
                                        className="h-12 w-12 rounded-full cursor-pointer"
                                    >
                                        <img
                                            src={userData?.user?.image || dp}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    </div>

                                    {show && (
                                        <div className="absolute top-18 left-[-120px] bg-white h-44 w-70 border border-gray-100 rounded shadow-lg p-5 flex flex-col gap-3">
                                            <div className='flex flex-row gap-3'>
                                                <img
                                                    src={userData?.user?.image || dp}
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <h1 className='text-[20px] font-semibold'>{userData?.user?.fullname}</h1>
                                                    <p className='text-gray-600 text-[15px] font-medium'>{userData?.user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            {
                                                userData && userData?.user?.role === "Student" && (
                                                    <>
                                                        <div className='flex flex-row gap-7'>
                                                            <LuUserRound className='text-2xl' />
                                                            <Link to="/profile"><p className='text-[16px] font-semibold text-gray-900 hover:underline cursor-pointer' onClick={() => setShow(prev => !prev)}>View Profile</p></Link>
                                                        </div>
                                                        <div className='flex flex-row gap-7'>
                                                            <LuLogOut className='text-2xl' />
                                                            <p className='text-[16px] font-semibold text-gray-900 hover:underline cursor-pointer' onClick={logoutHandle}>Logout</p>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <div className='flex flex-row gap-7 mt-3'>
                                                <LuLogOut className='text-2xl' />
                                                <p className='text-[16px] font-semibold text-gray-900 hover:underline cursor-pointer' onClick={logoutHandle}>Logout</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        }

                    </div>
                </div>

            </div>

        </div>

    )
}

export default Navbar
