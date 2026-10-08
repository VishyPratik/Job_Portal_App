import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react';
import axios from "axios"
import { serverUrl } from '../main';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/UserSlice';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {

            let result = await axios.post(`${serverUrl}/api/user/login`, {
                email, password, role
            }, {
                withCredentials: true
            })
            //console.log(result.data);
                toast.success("Login Successfully...")
             dispatch(setUserData(result.data));
            navigate("/");
            setEmail("");
            setPassword("");
            setErr("");
        }
        catch (error) {
            console.log(error.message);
            console.log(error.response?.data);
            setErr(error.response.data.message);
            // setErr(error.response.data.message);
        }
        setLoading(false);
    }
    return (
        <div className="flex justify-center items-center px-4">

            <div className="h-auto min-h-93 w-full max-w-140 border border-gray-100 rounded shadow mt-15 md:mt-25 p-5">

                <h1 className="text-2xl font-bold">
                    Login
                </h1>

                <form onSubmit={handleLogin} className="mt-5">

                    
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

                    <br />

                   
                    <div className="mt-4 flex items-center text-[16px] font-medium">

                        <input
                            type="radio"
                            className="cursor-pointer"
                            value="Student"
                            name="role"
                            checked={role === "Student"}
                            onChange={(e) => setRole(e.target.value)}
                        />

                        <label htmlFor="" className="ml-1">
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

                        <label htmlFor="" className="ml-1">
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
                        className="h-9 w-full bg-black text-white font-semibold text-[16px] rounded mt-6 cursor-pointer"
                    >
                        {loading ? "Please Wait..." : "Login"}
                    </button>

                </form>

                <p className="mt-3 text-[15px] sm:text-[16px]">
                    Don't have an account?
                    <Link to="/signup">
                        <span className="text-blue-600 font-semibold ml-1">
                            Signup
                        </span>
                    </Link>
                </p>

            </div>

        </div>
    )
}

export default Login
