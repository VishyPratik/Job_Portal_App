import React, { useEffect } from 'react'
import Navbar from "./Pages/Navbar"
import { Route, Routes, useNavigate } from "react-router"
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Jobs from "./Pages/Jobs"
import Browse from './Pages/Browse'
import Profile from './Pages/Profile'
import Description from "./component/Description"
import getCurrentUser from './custom hook/GetCurrentUser'
import getAllJobs from './custom hook/GetAllJobs'
import Companies from './Pages/Companies'
import { useSelector } from 'react-redux'
import CompanyCreate from './Pages/CompanyCreate'
import CompanySetup from './Pages/CompanySetup'
import GetCompany from './custom hook/GetCompany'
import JobsAdmin from './Pages/JobsAdmin'
import PostJobs from './Pages/PostJobs'
import Applicants from './Pages/Applicants'
function App() {
    getCurrentUser();
    getAllJobs();
    
  return (
    <div>
          
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/jobs" element={<Jobs />}></Route>
              <Route path="/browse" element={<Browse />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/description/:id" element={<Description />}></Route>
              <Route path="/admin/companies" element={<Companies />}></Route>
              <Route path="/admin/create/company" element={<CompanyCreate />}></Route>
              <Route path="/admin/create/:id" element={<CompanySetup />}></Route>
              <Route path="/admin/jobs" element={<JobsAdmin />}></Route>
              <Route path="/admin/jobs/create" element={<PostJobs />}></Route>
              <Route path="/admin/jobs/applicants/:id" element={<Applicants />}></Route>
          </Routes>
    </div>
  )
}

export default App
