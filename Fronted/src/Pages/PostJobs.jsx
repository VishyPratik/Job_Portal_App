import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import GetAllCoompany from '../custom hook/GetAllCoompany';
import axios from 'axios';
import { serverUrl } from '../main';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function PostJobs() {

    GetAllCoompany();

    const { companies } = useSelector((state) => state.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        jobType: "",
        position: "",
        experience: "",
        companyName: "",
    });

    const handlerInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const matchCompany = (companyName) => {
        return (companies || []).find(
            (company) =>
                company?.name?.toLowerCase() === companyName.toLowerCase()
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const company = matchCompany(input.companyName);

        if (!company) {
            alert("Please select a company");
            setLoading(false);
            return;
        }

        try {

            const result = await axios.post(
                `${serverUrl}/api/job/jobPost`,
                {
                    title: input.title,
                    description: input.description,
                    location: input.location,
                    salary: input.salary,
                    jobType: input.jobType,
                    position: input.position,
                    experience: input.experience,
                    companyId: company._id
                },
                {
                    withCredentials: true
                }
            );

            navigate("/admin/jobs");
            toast.success("Job Post Successfully...");

            console.log("Job Created:", result.data);

        } catch (error) {

            console.log("Error:", error.message);
            console.log("Backend Error:", error.response?.data);

        }

        setLoading(false);
    };

    return (
        <div className="w-full px-3 sm:px-5 md:px-8 py-8">

            <div className="w-full max-w-3xl mx-auto border border-gray-200 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">

                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
                    Post New Job
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 sm:gap-6"
                >


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div className="w-full">
                            <label
                                htmlFor="title"
                                className="text-sm sm:text-base font-bold"
                            >
                                Title
                            </label>

                            <input
                                id="title"
                                type="text"
                                placeholder="Enter job title"
                                className="h-10 w-full mt-1 border border-gray-200 rounded shadow-sm px-3 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                                name="title"
                                value={input.title}
                                onChange={handlerInput}
                            />
                        </div>

                        <div className="w-full">
                            <label
                                htmlFor="description"
                                className="text-sm sm:text-base font-bold"
                            >
                                Description
                            </label>

                            <input
                                id="description"
                                type="text"
                                placeholder="Enter job description"
                                className="h-10 w-full mt-1 border border-gray-200 rounded shadow-sm px-3 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                                name="description"
                                value={input.description}
                                onChange={handlerInput}
                            />
                        </div>

                    </div>



                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div className="w-full">
                            <label
                                htmlFor="location"
                                className="text-sm sm:text-base font-bold"
                            >
                                Location
                            </label>

                            <input
                                id="location"
                                type="text"
                                placeholder="Enter job location"
                                className="h-10 w-full mt-1 border border-gray-200 rounded shadow-sm px-3 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                                name="location"
                                value={input.location}
                                onChange={handlerInput}
                            />
                        </div>

                        <div className="w-full">
                            <label
                                htmlFor="salary"
                                className="text-sm sm:text-base font-bold"
                            >
                                Salary
                            </label>

                            <input
                                id="salary"
                                type="number"
                                placeholder="Enter job salary"
                                className="h-10 w-full mt-1 border border-gray-200 rounded shadow-sm px-3 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                                name="salary"
                                value={input.salary}
                                onChange={handlerInput}
                            />
                        </div>

                    </div>



                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div className="w-full">
                            <label
                                htmlFor="jobType"
                                className="text-sm sm:text-base font-bold"
                            >
                                Job Type
                            </label>

                            <input
                                id="jobType"
                                type="text"
                                placeholder="Enter job type"
                                className="h-10 w-full mt-1 border border-gray-200 rounded shadow-sm px-3 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                                name="jobType"
                                value={input.jobType}
                                onChange={handlerInput}
                            />
                        </div>

                        <div className="w-full">
                            <label
                                htmlFor="experience"
                                className="text-sm sm:text-base font-bold"
                            >
                                Experience
                            </label>

                            <input
                                id="experience"
                                type="number"
                                placeholder="Enter job experience"
                                className="h-10 w-full mt-1 border border-gray-200 rounded shadow-sm px-3 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                                name="experience"
                                value={input.experience}
                                onChange={handlerInput}
                            />
                        </div>

                    </div>



                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div className="w-full">
                            <label
                                htmlFor="position"
                                className="text-sm sm:text-base font-bold"
                            >
                                Position
                            </label>

                            <input
                                id="position"
                                type="number"
                                placeholder="Enter job position"
                                className="h-10 w-full mt-1 border border-gray-200 rounded shadow-sm px-3 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                                name="position"
                                value={input.position}
                                onChange={handlerInput}
                            />
                        </div>



                        <div className="w-full">

                            <label
                                htmlFor="companyName"
                                className="text-sm sm:text-base font-bold"
                            >
                                Select Company
                            </label>

                            <select
                                id="companyName"
                                name="companyName"
                                value={input.companyName}
                                onChange={handlerInput}
                                className="h-10 w-full mt-1 border border-gray-200 shadow-sm rounded px-2 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                            >

                                <option value="" disabled>
                                    Select Company
                                </option>

                                {
                                    companies?.map((company) => (
                                        <option
                                            key={company._id}
                                            value={company.name}
                                        >
                                            {company?.name}
                                        </option>
                                    ))
                                }

                            </select>

                        </div>

                    </div>



                    <div className="w-full mt-2">

                        <button
                            type="submit"
                            disabled={loading || companies?.length === 0}
                            className="h-10 w-full rounded bg-black text-sm sm:text-base font-semibold text-white cursor-pointer hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                        >
                            {loading ? "Please wait..." : "Post Job"}
                        </button>

                        {
                            companies?.length === 0 && (
                                <p className="text-sm sm:text-base font-semibold text-red-600 text-center mt-2">
                                    *Please register a company to post jobs
                                </p>
                            )
                        }

                    </div>

                </form>

            </div>

        </div>
    )
}

export default PostJobs