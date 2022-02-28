import React, { useEffect, useState } from 'react';
import Router from '../Router';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import useStyles from './Style';

import Sidebar from '../Sidebar/Sidebar';
import SidebarItem from '../Sidebar/SidebarItem';

const Layout = () => {
    return (
        <BrowserRouter>
            <Box sx={{ height: '100vh' }}>
                <Sidebar />
                <Main />
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
