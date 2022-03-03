import React, { useEffect, useState } from 'react';
import Router from '../Router';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Fab, IconButton } from '@mui/material';
import { FileCopy, Save, Print, Share, Dehaze } from '@mui/icons-material';
import useStyles from './Style';

import Sidebar from '../Sidebar/Sidebar';
import SidebarItem from '../Sidebar/SidebarItem';
import AnotherSidebar from '../RightSidebar/RightSidebar';

const actions = [
    { icon: <FileCopy />, name: 'Copy' },
    { icon: <Save />, name: 'Save' },
    { icon: <Print />, name: 'Print' },
    { icon: <Share />, name: 'Share' },
];

const Layout = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };
    return (
        <BrowserRouter>
            <Box sx={{ height: '100vh', display: 'flex' }}>
                <Sidebar />
                <Main />
                <IconButton color="primary" aria-label="add" sx={{ position: 'fixed', top: 40, right: 40 }} onClick={handleDrawerOpen}>
                    <Dehaze />
                </IconButton>
                <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', bottom: 40, right: 40 }} icon={<SpeedDialIcon />}>
                    {actions.map((action) => (
                        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
                    ))}
                </SpeedDial>
                <AnotherSidebar open={openDrawer} setClose={handleDrawerClose} />
            </Box>
        </BrowserRouter>
    );
};
const Main = () => {
    const classes = useStyles();
    const location = useLocation();
    const pathName = location.pathname;

    const [page, setPage] = useState({});

    useEffect(() => {
        setPage(SidebarItem.find((item) => item.route === pathName));
    }, [location.pathname]);

    return (
        <Box className={classes.container}>
            <Box className={classes.header}>
                <Box className={classes.title}>{page.display_name}</Box>
            </Box>
            <Router />
        </Box>
    );
};

export default Layout;
