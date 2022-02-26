import React from 'react';
import Router from '../Router';
import { BrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import useStyles from './Style';

import Sidebar from '../Sidebar/Sidebar';

const Layout = () => {
    const classes = useStyles();
    return (
        <BrowserRouter>
            <Box sx={{ height: '100vh' }}>
                <Sidebar />

                <Box className={classes.container}>
                    <Router />
                </Box>
            </Box>
        </BrowserRouter>
    );
};

export default Layout;
