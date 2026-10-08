import React, { useEffect } from 'react'
import HomeSection from "../component/HomeSection"
import Category from '../component/Category'
import LatestJob from '../component/LatestJob'
import Footer from '../component/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
function Home() {
    const { userData } = useSelector((state) => state.user);
        const navigate = useNavigate();
        useEffect(() => {
            if (userData?.user?.role === "Recruiter") {
                navigate("/admin/companies");
            }
    
        }, []);
  return (
    <div>
          <HomeSection />
          <Category />
          <LatestJob />
          <Footer />
    </div>
  )
}

export default Home
