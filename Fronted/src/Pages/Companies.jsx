import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import GetAllCoompany from '../custom hook/GetAllCoompany';
import { useSelector, useDispatch } from 'react-redux'
import { setSearchCompany } from '../redux/CompanySlice'
import CompanyTable from './CompanyTable';

function Companies() {

    const navigate = useNavigate();
    const { companies } = useSelector((state) => state.company);

    GetAllCoompany();

    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    useEffect(() => {
        dispatch(setSearchCompany(input));
    }, [input, dispatch]);

    return (
        <div className="w-full px-3 sm:px-5 md:px-8">

            <div className="max-w-7xl mx-auto mt-16 md:mt-20">


                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">


                    <div className="w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Filter by Name"
                            value={input}
                            className="h-10 w-full sm:w-56 md:w-64 border border-gray-200 rounded px-3 text-sm sm:text-base font-semibold outline-none focus:border-blue-500"
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>


                    <div className="w-full sm:w-auto">
                        <button
                            className="h-10 w-full sm:w-36 bg-black rounded text-sm font-medium text-white cursor-pointer hover:bg-gray-800 transition"
                            onClick={() => navigate("/admin/create/company")}
                        >
                            Add Company
                        </button>
                    </div>

                </div>


                <div className="mt-6 w-full overflow-x-auto">
                    <CompanyTable />
                </div>

            </div>

        </div>
    )
}

export default Companies