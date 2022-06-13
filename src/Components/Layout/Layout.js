import React, { useEffect, useState } from 'react'
import Router from '../Router'
import { BrowserRouter, HashRouter, useLocation, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon, IconButton, Avatar, Button } from '@mui/material'
import { FileCopy, Save, Print, Share, Apps, Person, Logout, Refresh } from '@mui/icons-material'
import { useDebouncedCallback } from 'use-debounce'
import useStyles from './Style'

import Sidebar from '../Sidebar/Sidebar'
import SidebarItem from '../Sidebar/SidebarItem'

import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'
import CustomAlert from '../CustomAlert/CustomAlert'

import PatientForm from '../../Pages/PatientForm/index'
import { clearData, reportTrigger } from '../../Redux/Slices/Report'
import { logout } from '../../Redux/Slices/Auth'
import { fetchDashboard } from '../../Redux/Slices/Dashboard'
import { patientTrigger } from '../../Redux/Slices/Patient'
import { userTrigger } from '../../Redux/Slices/User'
import { departmentTrigger } from '../../Redux/Slices/Department'
import { fetchSchedule } from '../../Redux/Slices/Schedule'

const Layout = () => {
    return (
        // <HashRouter basename={process.env.REACT_APP_ROUTE_BASENAME}>
        <HashRouter>
            <Routes>
                <Route
                    path="*"
                    element={
                        <Box sx={{ height: '100vh', display: 'flex' }}>
                            <Sidebar />
                            <CustomScrollbar>
                                <Main />
                            </CustomScrollbar>
                        </Box>
                    }
                />
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
    }, 500)

    const actions = [
        { icon: <Logout />, name: '登出', event: () => dispatch(logout()) },
        { icon: <Refresh />, name: '重新載入', event: refresh },
    ]

    useEffect(() => {
        setPage(SidebarItem.find(item => item.route === pathName))
    }, [location.pathname])

    return (
        <Box className={`${classes.container} ${isOpen || 'close'}`}>
            <Router />
            <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', bottom: 25, right: 25 }} icon={<SpeedDialIcon />}>
                {actions.map(action => (
                    <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.event} />
                ))}
            </SpeedDial>
            {/* <IconButton color="primary" aria-label="add" className={classes.dashboardButton} onClick={() => dispatch(openDashboard())}>
                <Apps sx={{ margin: '20px 30px 20px 8px' }} />
            </IconButton> */}
            {/* <Dashboard /> */}
            {/* <CustomAlert /> */}
        </Box>
    )
}

export default Layout
