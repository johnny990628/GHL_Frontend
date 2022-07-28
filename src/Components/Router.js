import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import CreateReport from '../Pages/CreateReport/CreateReport'
import Home from '../Pages/Home/Home'
import Patient from '../Pages/Patient/Patient'
import Department from '../Pages/Department/Department'
import Report from '../Pages/Report/Report'
import User from '../Pages/User/User'

import { useDispatch, useSelector } from 'react-redux'
import { apiVerify } from '../Axios/Auth'
import { fillAuthState } from '../Redux/Slices/Auth'
import PatientForm from '../Pages/PatientForm'
import Login from '../Pages/Login/Login'

const Router = () => {
    const location = useLocation()

    useEffect(() => {}, [location.pathname])
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createReport" element={<CreateReport />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/department" element={<Department />} />
            <Route path="/report" element={<Report />} />
            <Route path="/user" element={<User />} />
           
        </Routes>
           

    )
}


export default Router
