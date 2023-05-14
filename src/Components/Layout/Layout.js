import React, { useEffect, useState } from 'react'

import { HashRouter, useLocation, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, SpeedDial, SpeedDialAction } from '@mui/material'
import { Dehaze, Logout, Refresh } from '@mui/icons-material'
import { useDebouncedCallback } from 'use-debounce'

import useStyles from './Style'

import Router from '../Router'
import Sidebar from '../Sidebar/Sidebar'
import SidebarItem from '../Router.config'
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'
import PatientForm from '../../Pages/PatientForm/index'
import { reportTrigger } from '../../Redux/Slices/Report'
import { fetchDashboard } from '../../Redux/Slices/Dashboard'
import { patientTrigger } from '../../Redux/Slices/Patient'
import { userTrigger } from '../../Redux/Slices/User'
import { departmentTrigger } from '../../Redux/Slices/Department'
import { fetchSchedule } from '../../Redux/Slices/Schedule'
import { fillAuthState, logout } from '../../Redux/Slices/Auth'
import { apiVerify } from '../../Axios/Auth'
import Login from '../../Pages/Login/Login'
import CustomNavbar from '../CustomNavbar/CustomNavbar'

const Layout = () => {
    const { verify } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const isLoggedIn = localStorage.getItem('isLoggedIn')

    useEffect(() => {
        if (isLoggedIn)
            apiVerify().then(res =>
                dispatch(
                    fillAuthState({
                        user: res.data.user,
                        token: res.data.token,
                    })
                )
            )
    }, [])
    return (
        // <HashRouter basename={process.env.REACT_APP_ROUTE_BASENAME}>
        <HashRouter>
            <Routes>
                <Route path="*" element={verify ? <Main /> : <Login />} />
                <Route path="/patientform" element={<PatientForm />} />
            </Routes>
        </HashRouter>
    )
}
const Main = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const pathName = location.pathname

    const { isOpen } = useSelector(state => state.sidebar)

    const [page, setPage] = useState({})

    const refresh = useDebouncedCallback(() => {
        switch (location.pathname) {
            case '/':
                dispatch(fetchDashboard())
                break
            case '/patient':
                dispatch(patientTrigger())
                break
            case '/createReport':
                dispatch(fetchSchedule())
                break
            case '/report':
                dispatch(reportTrigger())
                break
            case '/user':
                dispatch(userTrigger())
                break
            case '/department':
                dispatch(departmentTrigger())
                break
            default:
                break
        }
    }, 1000)

    // const actions = [
    //     { icon: <Logout />, name: '登出', event: () => dispatch(logout()) },
    //     { icon: <Refresh />, name: '重新載入', event: refresh },
    // ]

    useEffect(() => {
        setPage(SidebarItem.find(item => item.path === pathName))
    }, [location.pathname])

    return (
        <Box sx={{ height: '100vh', display: 'flex' }}>
            <CustomNavbar />
            <Sidebar />
            <CustomScrollbar>
                <Box className={`${classes.container} ${isOpen || 'close'}`}>
                    <Router />
                    {/* <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', bottom: 25, right: 25 }} icon={<Dehaze />}>
                        {actions.map(action => (
                            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.event} />
                        ))}
                    </SpeedDial> */}
                </Box>
            </CustomScrollbar>
        </Box>
    )
}

export default Layout
