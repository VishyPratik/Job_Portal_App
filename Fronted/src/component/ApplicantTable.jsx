import axios from 'axios';
import React, { useEffect } from 'react'
import { serverUrl } from '../main';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplications } from '../redux/ApplicationSlice';

function ApplicantTable() {
    const { applicants } = useSelector((state) => state.application);
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const getApplicants = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/applicant/applicants/${params.id}`,
                    { withCredentials: true }
                );

                if (result.data.success) {
                    dispatch(setAllApplications(result.data.applications));
                }
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        };

        if (params.id) {
            getApplicants();
        }
    }, [params.id, dispatch]);

    const updateStatus = async (applicationId, status) => {
        try {
            const result = await axios.put(
                `${serverUrl}/api/applicant/status/${applicationId}`,
                { status },
                { withCredentials: true }
            );

            if (result.data.success) {
                const updatedApplications = applicants.map((application) =>
                    application._id === applicationId
                        ? { ...application, status }
                        : application
                );

                dispatch(setAllApplications(updatedApplications));
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="w-full">
           
            <div className="w-full overflow-x-auto rounded-lg border border-gray-200 mt-5 sm:mt-7">
                <table className="w-full min-w-[750px]">

                    <thead className="h-12 bg-gray-100">
                        <tr>
                            <th className="px-4 sm:px-6 text-left text-sm sm:text-base font-bold whitespace-nowrap">
                                Full Name
                            </th>
                            <th className="px-4 sm:px-6 text-left text-sm sm:text-base font-bold whitespace-nowrap">
                                Email
                            </th>
                            <th className="px-4 sm:px-6 text-left text-sm sm:text-base font-bold whitespace-nowrap">
                                Contact
                            </th>
                            <th className="px-4 sm:px-6 text-left text-sm sm:text-base font-bold whitespace-nowrap">
                                Date
                            </th>
                            <th className="px-4 sm:px-6 text-left text-sm sm:text-base font-bold whitespace-nowrap">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {applicants?.length > 0 ? (
                            applicants.map((application) => (
                                <tr
                                    key={application._id}
                                    className="border-b border-gray-200 text-sm sm:text-base font-medium text-gray-800 hover:bg-gray-50"
                                >
                                    <td className="px-4 sm:px-6 py-4 sm:py-5 whitespace-nowrap">
                                        {application.applicant?.fullname || "-"}
                                    </td>

                                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                                        {application.applicant?.email || "-"}
                                    </td>

                                    <td className="px-4 sm:px-6 py-4 sm:py-5 whitespace-nowrap">
                                        {application.applicant?.phoneNumber || "-"}
                                    </td>

                                    <td className="px-4 sm:px-6 py-4 sm:py-5 whitespace-nowrap">
                                        {application.createdAt
                                            ? new Date(application.createdAt).toLocaleDateString("en-GB")
                                            : "-"}
                                    </td>

                                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                                        {application.status === "pending" ? (
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() =>
                                                        updateStatus(application._id, "accepted")
                                                    }
                                                    className="px-3 py-2 text-xs sm:text-sm bg-green-500 hover:bg-green-600 text-white rounded-md cursor-pointer transition"
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        updateStatus(application._id, "rejected")
                                                    }
                                                    className="px-3 py-2 text-xs sm:text-sm bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer transition"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span
                                                className={`inline-block px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold capitalize ${application.status === "accepted"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {application.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8 px-4 text-sm sm:text-base text-gray-500"
                                >
                                    No applicants found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            <p className="text-sm sm:text-base text-gray-600 font-semibold text-center mt-4 mb-3">
                Your Recent Applied Users
            </p>
        </div>
    )
}

export default ApplicantTable