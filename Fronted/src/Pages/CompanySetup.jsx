import React, { useEffect, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { serverUrl } from '../main';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import GetCompany from '../custom hook/GetCompany';

function CompanySetup() {

    const { singleCompany } = useSelector((state) => state.company);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    GetCompany(params.id);

    const [input, setInput] = useState({
        name: "",
        description: "",
        location: "",
        website: "",
    });

    const handlerInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handlerForm = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            let result = await axios.put(
                `${serverUrl}/api/company/update/${params.id}`,
                {
                    name: input.name,
                    description: input.description,
                    location: input.location,
                    website: input.website,
                },
                {
                    withCredentials: true
                }
            );

            toast.success("Company Update Successfully...");
            navigate("/admin/companies");

        } catch (error) {

            console.log(error.message);
            console.log(error.response?.data);

        }

        setLoading(false);
    };

    useEffect(() => {

        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            location: singleCompany?.location || "",
            website: singleCompany?.website || "",
        });

    }, [singleCompany]);

    return (
        <div className="w-full px-4 sm:px-6 md:px-8 py-8">

            <div className="w-full max-w-xl mx-auto border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">


                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between">

                    <button
                        type="button"
                        className="h-9 w-20 border border-gray-200 rounded flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-100"
                        onClick={() => navigate("/admin/create/company")}
                    >
                        <GoArrowLeft />
                        <p>Back</p>
                    </button>

                    <h1 className="text-xl sm:text-2xl font-bold text-center">
                        Company Setup
                    </h1>

                    <div className="hidden sm:block w-20"></div>

                </div>


                <form
                    onSubmit={handlerForm}
                    className="mt-6 flex flex-col gap-4"
                >

                    <div>
                        <label
                            htmlFor="name"
                            className="text-sm sm:text-base font-semibold"
                        >
                            Company Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            className="h-10 w-full border border-gray-100 rounded shadow-sm px-3 mt-1 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                            name="name"
                            value={input.name}
                            onChange={handlerInput}
                        />
                    </div>


                    <div>
                        <label
                            htmlFor="description"
                            className="text-sm sm:text-base font-semibold"
                        >
                            Description
                        </label>

                        <input
                            id="description"
                            type="text"
                            className="h-10 w-full border border-gray-100 rounded shadow-sm px-3 mt-1 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                            name="description"
                            value={input.description}
                            onChange={handlerInput}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="location"
                            className="text-sm sm:text-base font-semibold"
                        >
                            Location
                        </label>

                        <input
                            id="location"
                            type="text"
                            className="h-10 w-full border border-gray-100 rounded shadow-sm px-3 mt-1 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                            name="location"
                            value={input.location}
                            onChange={handlerInput}
                        />
                    </div>


                    <div>
                        <label
                            htmlFor="website"
                            className="text-sm sm:text-base font-semibold"
                        >
                            Website
                        </label>

                        <input
                            id="website"
                            type="text"
                            placeholder="https://example.com"
                            className="h-10 w-full border border-gray-100 rounded shadow-sm px-3 mt-1 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                            name="website"
                            value={input.website}
                            onChange={handlerInput}
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="h-10 w-full bg-black rounded shadow text-white text-sm sm:text-base font-semibold cursor-pointer hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition mt-2"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>

                </form>

            </div>

        </div>
    )
}

export default CompanySetup