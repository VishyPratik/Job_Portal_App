import React from 'react'
import ApplicantTable from '../component/ApplicantTable'
import { useSelector } from 'react-redux'

function Applicants() {

    const { applicants } = useSelector((state) => state.application);

    return (
        <div className="w-full px-3 sm:px-5 md:px-8 py-6 sm:py-8">

            <div className="max-w-7xl mx-auto">


                <div className="mt-4 sm:mt-6 mb-5 sm:mb-7">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        Applicants ({applicants?.length || 0})
                    </h1>

                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                        Manage and review job applicants
                    </p>
                </div>


                <div className="w-full overflow-x-auto">
                    <ApplicantTable />
                </div>

            </div>

        </div>
    )
}

export default Applicants