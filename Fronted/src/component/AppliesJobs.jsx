import React from 'react'
import GetAppliedJob from '../custom hook/GetAppliedJob'
import { useSelector } from 'react-redux';

function AppliesJobs() {

    GetAppliedJob();

    const { allAppliedJobs } = useSelector((state) => state.job)

    return (

        <div className="w-full px-3 sm:px-5">

            <div className="w-full max-w-6xl mx-auto">

                <h1 className="text-xl sm:text-2xl font-bold mb-5">
                    Applied Jobs
                </h1>


                <div className="w-full overflow-x-auto rounded-lg border">

                    <table className="w-full min-w-[650px] border-collapse">

                        <thead>
                            <tr className="border-b bg-gray-50">

                                <th className="p-3 sm:p-4 text-left font-semibold whitespace-nowrap">
                                    Date
                                </th>

                                <th className="p-3 sm:p-4 text-left font-semibold whitespace-nowrap">
                                    Job Title
                                </th>

                                <th className="p-3 sm:p-4 text-left font-semibold whitespace-nowrap">
                                    Company
                                </th>

                                <th className="p-3 sm:p-4 text-left font-semibold whitespace-nowrap">
                                    Status
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {allAppliedJobs?.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="4"
                                        className="p-8 text-center text-gray-500"
                                    >
                                        No Applied Jobs Found
                                    </td>
                                </tr>

                            ) : (

                                allAppliedJobs?.map((item, index) => (

                                    <tr
                                        key={item._id || index}
                                        className="border-b hover:bg-gray-50"
                                    >


                                        <td className="p-3 sm:p-4 whitespace-nowrap">

                                            {item?.createdAt
                                                ? new Date(
                                                    item.createdAt
                                                ).toLocaleDateString("en-GB")
                                                : "-"
                                            }

                                        </td>


                                        <td className="p-3 sm:p-4 font-medium max-w-[250px]">

                                            <div className="truncate">
                                                {item?.job?.title || "-"}
                                            </div>

                                        </td>



                                        <td className="p-3 sm:p-4 uppercase font-semibold whitespace-nowrap">

                                            {item?.job?.company?.name || "-"}

                                        </td>


                                        <td className="p-3 sm:p-4 whitespace-nowrap">

                                            <span
                                                className={`
                                                    inline-block
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    sm:text-sm
                                                    font-medium
                                                    ${item?.status === "accepted"
                                                        ? "bg-green-100 text-green-700"
                                                        : item?.status === "rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }
                                                `}
                                            >
                                                {item?.status || "pending"}
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default AppliesJobs