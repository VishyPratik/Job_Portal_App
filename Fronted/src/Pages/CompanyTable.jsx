import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function CompanyTable() {

    const navigate = useNavigate();
    const { companies, companyText } = useSelector((state) => state.company);

    const [filterCompany, setFilterCompany] = useState(companies || []);

    useEffect(() => {
        const filtered = (companies || []).filter((company) => {

            if (!companyText) {
                return true;
            }

            return company?.name
                ?.toLowerCase()
                .includes(companyText.toLowerCase());

        });

        setFilterCompany(filtered);

    }, [companies, companyText]);

    return (
        <div className="w-full">


            <div className="w-full overflow-x-auto mt-6 rounded-lg border border-gray-100">

                <table className="w-full min-w-[650px]">

                    <thead className="bg-gray-100">
                        <tr className="h-12">

                            <th className="px-4 text-sm sm:text-base font-bold">
                                Company Name
                            </th>

                            <th className="px-4 text-sm sm:text-base font-bold">
                                Date
                            </th>

                            <th className="px-4 text-sm sm:text-base font-bold">
                                Location
                            </th>

                            <th className="px-4 text-sm sm:text-base font-bold">
                                Edit
                            </th>

                        </tr>
                    </thead>

                    <tbody>

                        {
                            filterCompany?.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-8 text-lg sm:text-xl font-bold"
                                    >
                                        No Company Found
                                    </td>
                                </tr>

                            ) : (

                                filterCompany?.map((company, index) => (

                                    <tr
                                        key={company._id || index}
                                        className="border-b text-center text-sm sm:text-base font-semibold hover:bg-gray-50"
                                    >


                                        <td className="py-4 px-4 uppercase font-bold">
                                            {company?.name}
                                        </td>


                                        <td className="py-4 px-4 whitespace-nowrap">
                                            {company?.createdAt
                                                ? company.createdAt.split("T")[0]
                                                : "-"}
                                        </td>


                                        <td className="py-4 px-4">
                                            {company?.location || "-"}
                                        </td>


                                        <td
                                            className="py-4 px-4 text-xl sm:text-2xl font-bold cursor-pointer hover:text-blue-600"
                                            onClick={() =>
                                                navigate(`/admin/create/${company._id}`)
                                            }
                                        >
                                            ...
                                        </td>

                                    </tr>

                                ))

                            )
                        }

                    </tbody>

                </table>

            </div>


            <p className="text-center mt-5 text-sm sm:text-[17px] text-gray-700 font-medium">
                Your recent registered Companies
            </p>

        </div>
    )
}

export default CompanyTable