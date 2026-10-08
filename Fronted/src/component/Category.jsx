import React, { useRef } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setSearchText } from '../redux/JobSlice';

function Category() {

    const category = [
        "Frontend Development",
        "Backend Development",
        "Data Science",
        "Graphic Designer",
        "FullStack Development"
    ]

    const categoryRef = useRef(null)

    const slideLeft = () => {
        categoryRef.current.scrollBy({
            left: -220,
            behavior: "smooth"
        })
    }

    const slideRight = () => {
        categoryRef.current.scrollBy({
            left: 220,
            behavior: "smooth"
        })
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const textHandler = (text) => {
        dispatch(setSearchText(text));
        navigate("/browse");
    }

    return (
        <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-7 mt-8 md:mt-13 px-2">

            <button
                onClick={slideLeft}
                className="
                    w-9 h-9
                    sm:w-10 sm:h-10
                    md:w-12 md:h-12
                    rounded-full
                    bg-gray-100
                    shadow-lg
                    flex-shrink-0
                    flex justify-center items-center
                    cursor-pointer
                    text-sm sm:text-base
                "
            >
                <FaArrowLeft />
            </button>

            <div
                ref={categoryRef}
                className="
                    w-[220px]
                    sm:w-[400px]
                    md:w-[650px]
                    overflow-x-auto
                "
                style={{
                    scrollbarWidth: "none"
                }}
            >
                <div className="flex gap-4 sm:gap-8 md:gap-32">

                    {category.map((cat, index) => (
                        <div
                            key={index}
                            className="
                                h-9
                                min-w-50
                                border border-gray-500
                                bg-gray-100
                                rounded-full
                                flex justify-center items-center
                                text-gray-800
                                shadow-lg
                                flex-shrink-0
                            "
                        >
                            <button onClick={() => textHandler(cat)} className="text-sm">
                                {cat}
                            </button>
                        </div>
                    ))}

                </div>
            </div>


            <button
                onClick={slideRight}
                className="
                    w-9 h-9
                    sm:w-10 sm:h-10
                    md:w-12 md:h-12
                    rounded-full
                    bg-gray-100
                    shadow-lg
                    flex-shrink-0
                    flex justify-center items-center
                    cursor-pointer
                    text-sm sm:text-base
                "
            >
                <FaArrowRight />
            </button>

        </div>
    )
}

export default Category