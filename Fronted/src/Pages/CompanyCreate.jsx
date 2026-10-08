import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import { setSingleCompany } from '../redux/CompanySlice';
import { serverUrl } from '../main';
import { toast } from 'react-toastify';

function CompanyCreate() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const handleCompany = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Please enter company name");
            return;
        }

        try {

            let result = await axios.post(
                `${serverUrl}/api/company/registerCompany`,
                {
                    name
                },
                {
                    withCredentials: true
                }
            );

            toast.success("Company Create Successfully...");

            dispatch(setSingleCompany(result.data));

            const companyId = result?.data?.company?._id;

            navigate(`/admin/create/${companyId}`);

        } catch (error) {

            console.log(error.message);
            console.log(error.response?.data);

        }
    }

    return (
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-8">

            <div className="w-full max-w-4xl mx-auto">


                <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        Company Name
                    </h1>

                    <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                        Company Description
                    </p>
                </div>

                <div className="mt-6">

                    <label
                        htmlFor="name"
                        className="text-sm sm:text-base font-bold"
                    >
                        Company Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        placeholder="Enter company name"
                        className="h-10 w-full border border-gray-200 rounded px-3 mt-1 shadow-sm text-sm sm:text-base font-medium outline-none focus:border-blue-500"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>


                <div className="mt-6 flex flex-col sm:flex-row gap-3">

                    <button
                        type="button"
                        onClick={() => navigate("/admin/companies")}
                        className="h-10 w-full sm:w-28 rounded bg-black text-white cursor-pointer hover:bg-gray-800 transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleCompany}
                        className="h-10 w-full sm:w-28 rounded bg-black text-white cursor-pointer hover:bg-blue-600 transition"
                    >
                        Continue
                    </button>

                </div>

            </div>

        </div>
    )
}

export default CompanyCreate