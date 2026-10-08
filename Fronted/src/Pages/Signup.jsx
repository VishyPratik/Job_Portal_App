import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react';
import { serverUrl } from '../main';
import { toast } from 'react-toastify';
import axios from "axios"
function Signup() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [phoneNumber, setPhoneNumber] = useState();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log("shi ho n");
            let result = await axios.post(`${serverUrl}/api/user/signup`, {
                fullname, email, phoneNumber, password, role
            }, {
                withCredentials: true
            })
           // console.log(result.data);
            toast.success("Signup Successfully...")
            // dispatch(setUserData(result.data));
             navigate("/login");
            /* setEmail("");
             setPassword("");*/
             setErr("");
        }
        catch (error) {
            console.log(error.message);
            console.log(error.response?.data);
            setErr(error.response.data.message);
            // setErr(error.response.data.message);
        }
        setLoading(false)
    }

    return (
        <div className="flex justify-center items-center px-4">

            <div className="h-auto min-h-130 w-full max-w-140 border border-gray-100 rounded shadow mt-10 p-5">

                <h1 className="text-2xl font-bold">
                    Sign UP
                </h1>

                <div className="mt-4">

                    <form onSubmit={handleSignup}>

                       
                        <label htmlFor="fullname" className="text-[16px] font-semibold">
                            Full Name
                        </label>

                        <br />

                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="h-9 w-full border border-gray-100 shadow rounded pl-3 text-[16px] font-semibold text-gray-900"
                            name="fullname"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />

                        <br />
                        <br />

                       
                        <label htmlFor="email" className="text-[16px] font-semibold">
                            Email
                        </label>

                        <br />

                        <input
                            type="text"
                            placeholder="Enter Email"
                            className="h-9 w-full border border-gray-100 shadow rounded pl-3 text-[16px] font-semibold text-gray-900"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <br />
                        <br />

                      
                        <label htmlFor="phoneNumber" className="text-[16px] font-semibold">
                            Phone Number
                        </label>

                        <br />

                        <input
                            type="number"
                            placeholder="Enter Phone Number"
                            className="h-9 w-full border border-gray-100 shadow rounded pl-3 text-[16px] font-semibold text-gray-900"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

                        <br />
                        <br />

                       
                        <label htmlFor="password" className="text-[16px] font-semibold">
                            Password
                        </label>

                        <br />

                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="h-9 w-full border border-gray-100 shadow rounded pl-3 text-[16px] font-semibold text-gray-900"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                      
                        <div className="mt-4 flex items-center text-[16px] font-medium">

                            <input
                                type="radio"
                                className="cursor-pointer"
                                value="Student"
                                name="role"
                                checked={role === "Student"}
                                onChange={(e) => setRole(e.target.value)}
                            />

                            <label htmlFor="Student" className="ml-1">
                                Student
                            </label>

                            <input
                                type="radio"
                                className="ml-4 cursor-pointer"
                                value="Recruiter"
                                name="role"
                                checked={role === "Recruiter"}
                                onChange={(e) => setRole(e.target.value)}
                            />

                            <label htmlFor="Recruiter" className="ml-1">
                                Recruiter
                            </label>

                        </div>

                      
                        {err && (
                            <p className="text-base sm:text-xl font-semibold text-red-500 text-center mt-2">
                                {err}*
                            </p>
                        )}

                      
                        <button
                            type="submit"
                            className="h-9 w-full bg-black text-white font-semibold text-[16px] rounded mt-4 cursor-pointer"
                        >
                            {loading ? "Please Wait..." : "Signup"}
                        </button>

                    </form>

                    <p className="mt-2 text-[15px] sm:text-[16px]">
                        Already have an account?
                        <Link to="/login">
                            <span className="text-blue-600 font-semibold ml-1">
                                Login
                            </span>
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    )
}

export default Signup
