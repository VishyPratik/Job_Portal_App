import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function AdminJobTable() {

    const navigate = useNavigate();

    const { jobText } = useSelector((state) => state.company);
    const { allAdminJobs } = useSelector((state) => state.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs || []);

    useEffect(() => {

        const filtered = (allAdminJobs || []).filter((job) => {

            if (!jobText) {
                return true;
            }

            return job?.title
                ?.toLowerCase()
                .includes(jobText.toLowerCase());

        });

        setFilterJobs(filtered);

    }, [allAdminJobs, jobText]);

    return (
        <div className="w-full">


            <div className="w-full overflow-x-auto mt-6 rounded-lg border border-gray-100">

                <table className="w-full min-w-[750px]">

                    <thead className="bg-gray-100">

                        <tr className="h-12">

                            <th className="px-4 text-sm sm:text-base font-bold whitespace-nowrap">
                                Company Name
                            </th>

                            <th className="px-4 text-sm sm:text-base font-bold whitespace-nowrap">
                                Role
                            </th>

                            <th className="px-4 text-sm sm:text-base font-bold whitespace-nowrap">
                                Date
                            </th>

                            <th className="px-4 text-sm sm:text-base font-bold whitespace-nowrap">
                                Location
                            </th>

                            <th className="px-4 text-sm sm:text-base font-bold whitespace-nowrap">
                                Applicants
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filterJobs?.length === 0 ? (

                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-8 text-lg sm:text-xl font-bold"
                                    >
                                        No Job Found
                                    </td>
                                </tr>

                            ) : (

                                filterJobs?.map((job, index) => (

                                    <tr
                                        key={job?._id || index}
                                        className="border-b text-center text-sm sm:text-base font-semibold hover:bg-gray-50"
                                    >


                                        <td className="py-4 px-4 uppercase font-bold whitespace-nowrap">
                                            {job?.company?.name || "-"}
                                        </td>


                                        <td className="py-4 px-4 whitespace-nowrap">
                                            {job?.title || "-"}
                                        </td>


                                        <td className="py-4 px-4 whitespace-nowrap">
                                            {job?.createdAt
                                                ? job.createdAt.split("T")[0]
                                                : "-"}
                                        </td>


                                        <td className="py-4 px-4 whitespace-nowrap">
                                            {job?.location || "-"}
                                        </td>


                                        <td
                                            className="py-4 px-4 text-xl sm:text-2xl font-bold cursor-pointer hover:text-blue-600"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/jobs/applicants/${job?._id}`
                                                )
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
                Your recent Posted Jobs
            </p>

        </div>
    )
}

export default AdminJobTable;