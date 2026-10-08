import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setSearchText } from '../redux/JobSlice';

function HomeSection() {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const textHandler = () => {
        dispatch(setSearchText(text));
        navigate("/browse");
    }
    return (
        <div>
            <div className="flex flex-col gap-5 justify-center items-center mt-10 md:mt-15 px-4">


                <div className="h-9 px-5 bg-gray-100 rounded-full flex justify-center items-center">
                    <p className="text-red-600 text-sm md:text-[17px] font-medium">
                        No. 1 Job Hunt website
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        Search, Apply &
                    </h1>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        Get Your{" "}
                        <span className="text-violet-600">
                            Dream Jobs
                        </span>
                    </h1>
                </div>


                <div className="text-center max-w-xl">
                    <p className="text-sm md:text-base text-gray-600">
                        Find the right job, apply with confidence, and take the next step toward your career.
                    </p>

                </div>


                <div className="flex flex-row w-full max-w-2xl">

                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        className="
                            h-10
                            flex-1
                            min-w-0
                            border
                            border-gray-100
                            outline-0
                            rounded-l-full
                            shadow-lg
                            pl-4
                            text-sm
                            md:text-[16px]
                            font-medium
                        "
                        value={text}
                        onChange={(e) =>setText(e.target.value)}
                    />

                    <button
                        className="
                            h-10
                            w-12
                            md:w-14
                            bg-violet-600
                            flex
                            justify-center
                            items-center
                            rounded-r-full
                            cursor-pointer
                            flex-shrink-0
                        "
                        onClick={textHandler}
                    >
                        <IoSearchOutline className="text-white text-xl" />
                    </button>

                </div>

            </div>
        </div>
    )
}

export default HomeSection