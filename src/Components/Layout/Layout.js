import React, { useEffect, useState } from 'react';
import Router from '../Router';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon, IconButton } from '@mui/material';
import { FileCopy, Save, Print, Share, Apps } from '@mui/icons-material';
import useStyles from './Style';

import Sidebar from '../Sidebar/Sidebar';
import SidebarItem from '../Sidebar/SidebarItem';
import Dashboard from '../Dashboard/Dashboard';
import { openDashboard } from '../../Redux/Slices/Dashboard';

const actions = [
    { icon: <FileCopy />, name: 'Copy' },
    { icon: <Save />, name: 'Save' },
    { icon: <Print />, name: 'Print' },
    { icon: <Share />, name: 'Share' },
];

const Layout = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <BrowserRouter>
            <Box sx={{ height: '100vh', display: 'flex' }}>
                <Sidebar />
                <Main />
                <IconButton color="primary" aria-label="add" className={classes.dashboardButton} onClick={() => dispatch(openDashboard())}>
                    <Apps sx={{ margin: '20px 30px 20px 5px' }} />
                </IconButton>
                {/* <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', bottom: 40, right: 40 }} icon={<SpeedDialIcon />}>
                    {actions.map((action) => (
                        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
                    ))}
                </SpeedDial> */}
                <Dashboard />
            </Box>
        </BrowserRouter>
    );
};
const Main = () => {
    const classes = useStyles();
    const location = useLocation();
    const pathName = location.pathname;
    const { isOpen } = useSelector((state) => state.sidebar);

    const [page, setPage] = useState({});

    useEffect(() => {
        setPage(SidebarItem.find((item) => item.route === pathName));
    }, [location.pathname]);

    return (
        <Box className={`${classes.container} ${isOpen || 'close'}`}>
            <Box className={classes.header}>
                <Box className={classes.title}>{page.display_name}</Box>
            </Box>
            <Router />
        </Box>
    );
};

export default Layout;
