import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
      <div className="
    min-h-25
    w-full
    flex
    flex-col
    md:flex-row
    justify-between
    items-center
    gap-5
    border border-gray-200
    mt-10 md:mt-15
    px-5 md:px-20
    py-5
">

         
          <div className="text-center md:text-left">
              <h1 className="text-xl font-bold">
                  Job Hunt
              </h1>

              <p className="text-sm sm:text-base md:text-[18px] font-medium text-gray-700">
                  © 2026 Your Company. All rights reserved.
              </p>
          </div>

        
          <div className="flex flex-row gap-5 sm:gap-7">

              <a href="https://github.com/VishyPratik">
                  <FaGithub className="text-2xl sm:text-3xl" />
              </a>

              <a href="https://www.linkedin.com/in/pratik-vishwakarma-870864331">
                  <FaLinkedin className="text-2xl sm:text-3xl" />
              </a>

              <a href="#">
                  <FaYoutube className="text-2xl sm:text-3xl" />
              </a>

              <a href="#">
                  <FaFacebook className="text-2xl sm:text-3xl" />
              </a>

          </div>

      </div>
        
  )
}

export default Footer
