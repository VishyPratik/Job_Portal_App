import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from 'react-redux';
import { serverUrl } from '../main';
import { toast } from 'react-toastify';
import { setUserData } from '../redux/UserSlice';
import axios from 'axios';

function EditProfile({ open, setOpen }) {

    const { userData } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: userData?.user?.fullname || "",
        email: userData?.user?.email || "",
        phoneNumber: userData?.user?.phoneNumber || "",
        bio: userData?.user?.profile?.bio || "",
        skills: userData?.user?.profile?.skills?.join(", ") || "",
    });

    const handlerInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handlerForm = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const result = await axios.post(
                `${serverUrl}/api/user/update`,
                {
                    fullname: input.fullname,
                    email: input.email,
                    phoneNumber: input.phoneNumber,
                    bio: input.bio,
                    skills: input.skills
                },
                {
                    withCredentials: true
                }
            );

            toast.success("Profile Update Successfully...");

            dispatch(setUserData(result.data));

            setOpen(false);

        } catch (error) {

            console.log(error.message);
            console.log(error.response?.data);

            toast.error(
                error.response?.data?.message || "Profile update failed"
            );

        }

        setLoading(false);
    }

    return (
        <>

            {open && (

                <div className="
                    w-full
                    max-w-md
                    max-h-[90vh]
                    overflow-y-auto
                    bg-white
                    border
                    border-gray-100
                    rounded-xl
                    shadow-xl
                    p-4
                    sm:p-6
                ">


                    <div className="flex justify-between items-center">

                        <h1 className="text-xl sm:text-2xl font-semibold">
                            Edit Profile
                        </h1>

                        <div
                            className="
                                flex
                                justify-center
                                items-center
                                h-8
                                w-8
                                border
                                border-gray-200
                                rounded
                                shadow
                                cursor-pointer
                                hover:bg-gray-100
                            "
                            onClick={() => setOpen(false)}
                        >
                            <RxCross2 />
                        </div>

                    </div>



                    <form
                        className="flex flex-col gap-4 mt-6"
                        onSubmit={handlerForm}
                    >


                        <div className="flex flex-col gap-1">

                            <label
                                htmlFor="fullname"
                                className="text-sm sm:text-[16px] font-semibold"
                            >
                                Name
                            </label>

                            <input
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={handlerInput}
                                className="
                                    h-9
                                    w-full
                                    border
                                    border-gray-200
                                    shadow
                                    rounded
                                    px-3
                                    text-sm
                                    sm:text-[16px]
                                    font-semibold
                                    text-gray-900
                                    outline-none
                                    focus:border-violet-500
                                "
                            />

                        </div>



                        <div className="flex flex-col gap-1">

                            <label
                                htmlFor="email"
                                className="text-sm sm:text-[16px] font-semibold"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={handlerInput}
                                className="
                                    h-9
                                    w-full
                                    border
                                    border-gray-200
                                    shadow
                                    rounded
                                    px-3
                                    text-sm
                                    sm:text-[16px]
                                    font-semibold
                                    text-gray-900
                                    outline-none
                                    focus:border-violet-500
                                "
                            />

                        </div>



                        <div className="flex flex-col gap-1">

                            <label
                                htmlFor="phoneNumber"
                                className="text-sm sm:text-[16px] font-semibold"
                            >
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={handlerInput}
                                className="
                                    h-9
                                    w-full
                                    border
                                    border-gray-200
                                    shadow
                                    rounded
                                    px-3
                                    text-sm
                                    sm:text-[16px]
                                    font-semibold
                                    text-gray-900
                                    outline-none
                                    focus:border-violet-500
                                "
                            />

                        </div>



                        <div className="flex flex-col gap-1">

                            <label
                                htmlFor="bio"
                                className="text-sm sm:text-[16px] font-semibold"
                            >
                                Bio
                            </label>

                            <textarea
                                name="bio"
                                value={input.bio}
                                onChange={handlerInput}
                                rows="3"
                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    shadow
                                    rounded
                                    px-3
                                    py-2
                                    text-sm
                                    sm:text-[16px]
                                    font-semibold
                                    text-gray-900
                                    outline-none
                                    resize-none
                                    focus:border-violet-500
                                "
                            />

                        </div>



                        <div className="flex flex-col gap-1">

                            <label
                                htmlFor="skills"
                                className="text-sm sm:text-[16px] font-semibold"
                            >
                                Skills
                            </label>

                            <input
                                type="text"
                                name="skills"
                                value={input.skills}
                                onChange={handlerInput}
                                placeholder="React, Node, MongoDB"
                                className="
                                    h-9
                                    w-full
                                    border
                                    border-gray-200
                                    shadow
                                    rounded
                                    px-3
                                    text-sm
                                    sm:text-[16px]
                                    font-semibold
                                    text-gray-900
                                    outline-none
                                    focus:border-violet-500
                                "
                            />

                            <p className="text-xs text-gray-500">
                                Skills ko comma se separate karein.
                            </p>

                        </div>



                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                h-10
                                w-full
                                sm:w-28
                                self-center
                                bg-violet-600
                                hover:bg-violet-700
                                rounded-lg
                                text-[16px]
                                font-semibold
                                text-white
                                mt-2
                                cursor-pointer
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>

                    </form>

                </div>

            )}

        </>
    )
}

export default EditProfile