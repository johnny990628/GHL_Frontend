import React, { useEffect, useState } from 'react';
import Router from '../Router';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { FileCopy, Save, Print, Share } from '@mui/icons-material';
import useStyles from './Style';

import Sidebar from '../Sidebar/Sidebar';
import SidebarItem from '../Sidebar/SidebarItem';
import AnotherSidebar from '../AnotherSideBar/AnotherSidebar';

const actions = [
    { icon: <FileCopy />, name: 'Copy' },
    { icon: <Save />, name: 'Save' },
    { icon: <Print />, name: 'Print' },
    { icon: <Share />, name: 'Share' },
];

const Layout = () => {
    return (
        <BrowserRouter>
            <Box sx={{ height: '100vh', display: 'flex' }}>
                <Sidebar />
                <Main />
                {/* <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'absolute', bottom: 40, right: 40 }} icon={<SpeedDialIcon />}>
                    {actions.map((action) => (
                        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
                    ))}
                </SpeedDial> */}
                <AnotherSidebar />
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
    }, [location]);

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
