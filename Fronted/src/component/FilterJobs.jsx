import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredJobs } from '../redux/JobSlice';

function FilterJobs() {
    const filterData = [
        {
            filterType: "Location",
            array: ["Delhi NCR", "Noida", "Pune", "Mumbai"]
        },
        {
            filterType: "Industry",
            array: ["Fronted Developement", "Backend Developement", "FullStack Developement"]
        },
        {
            filterType: "Salary",
            array: ["0-40K", "40K-1Lakh", "1Lakh-5Lakh"]
        }
    ]
    const dispatch = useDispatch();
    const { allJobs } = useSelector((state) => state.job);
    const [selectedLocation, setSelectedLocation] = useState("");
    const handleLocationFilter = (location) => {
        setSelectedLocation(location);

        const filteredJobs = allJobs.filter((job) =>
            job.location?.toLowerCase().includes(location.toLowerCase())
        );

        console.log("Selected Location:", location);
        console.log("Filtered Jobs:", filteredJobs);

        dispatch(setFilteredJobs(filteredJobs));
    };
    //console.log(selectedLocation);
    return (
        <div className='flex justify-center item'>

            <div>
                <h1 className='text-xl font-bold'>Filter Jobs</h1>
                <hr className='mt-2' />
                {
                    filterData.map((data, index) => (
                        <div className='mt-3' key={index}>
                            <h1 className='text-xl font-bold'>{data.filterType}</h1>
                            {
                                data.array.map((item, index) => (
                                    <div className='mt-1' key={index}>
                                        <input
                                            type="radio"
                                            name="location"
                                            value={item}
                                            checked={selectedLocation === item}
                                            onChange={() => handleLocationFilter(item)}
                                        />
                                        <label className='font-[18px] font-semibold ml-2'>{item}</label>
                                    </div>

                                ))
                            }

                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default FilterJobs
