import React, { useEffect, useState } from 'react';
import Router from '../Router';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon, IconButton } from '@mui/material';
import { FileCopy, Save, Print, Share, Dehaze } from '@mui/icons-material';
import useStyles from './Style';

import Sidebar from '../Sidebar/Sidebar';
import SidebarItem from '../Sidebar/SidebarItem';
import AnotherSidebar from '../RightSidebar/RightSidebar';
import { openDrawer } from '../../Redux/Slices/Drawer';

const actions = [
    { icon: <FileCopy />, name: 'Copy' },
    { icon: <Save />, name: 'Save' },
    { icon: <Print />, name: 'Print' },
    { icon: <Share />, name: 'Share' },
];

const Layout = () => {
    const dispatch = useDispatch();

    return (
        <BrowserRouter>
            <Box sx={{ height: '100vh', display: 'flex' }}>
                <Sidebar />
                <Main />
                <IconButton color="primary" aria-label="add" sx={{ position: 'fixed', top: 40, right: 40 }} onClick={() => dispatch(openDrawer())}>
                    <Dehaze />
                </IconButton>
                <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', bottom: 40, right: 40 }} icon={<SpeedDialIcon />}>
                    {actions.map((action) => (
                        <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
                    ))}
                </SpeedDial>
                {/* <AnotherSidebar /> */}
            </Box>
        </BrowserRouter>
    );
};
const Main = () => {
    const classes = useStyles();
    const location = useLocation();
    const pathName = location.pathname;
    const { open } = useSelector((state) => state.drawer);

    const [page, setPage] = useState({});

    useEffect(() => {
        setPage(SidebarItem.find((item) => item.route === pathName));
    }, [location.pathname]);

    return (
        <Box className={`${classes.container} ${open || 'close'}`}>
            <Box className={classes.header}>
                <Box className={classes.title}>{page.display_name}</Box>
            </Box>
            <Router />
        </Box>
    );
};

export default Layout;
