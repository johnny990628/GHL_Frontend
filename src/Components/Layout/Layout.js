import React, { useEffect, useState } from 'react'
import Router from '../Router'
import { BrowserRouter, useLocation, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon, IconButton } from '@mui/material'
import { FileCopy, Save, Print, Share, Apps } from '@mui/icons-material'
import useStyles from './Style'

import Sidebar from '../Sidebar/Sidebar'
import SidebarItem from '../Sidebar/SidebarItem'
import Dashboard from '../Dashboard/Dashboard'
import { openDashboard } from '../../Redux/Slices/Dashboard'
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar'

import PatientForm from '../../Pages/PatientForm/index'

const Layout = () => {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    )
}
const Main = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const pathName = location.pathname
    const { isOpen } = useSelector(state => state.sidebar)

    const [page, setPage] = useState({})

    useEffect(() => {
        setPage(SidebarItem.find(item => item.route === pathName))
    }, [location.pathname])

    return (
        <Box className={`${classes.container} ${isOpen || 'close'}`}>
            <Box className={classes.header}>{/* <Box className={classes.title}>{page.display_name}</Box> */}</Box>
            <Router />
            <IconButton color="primary" aria-label="add" className={classes.dashboardButton} onClick={() => dispatch(openDashboard())}>
                <Apps sx={{ margin: '20px 30px 20px 8px' }} />
            </IconButton>
            <Dashboard />
            <CustomSnackbar />
        </Box>
    )
}

export default Layout
