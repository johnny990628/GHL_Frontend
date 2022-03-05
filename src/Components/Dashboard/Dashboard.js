import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from '@mui/material';

import useStyles from './Style';
import LittleTable from '../LittleTable/LittleTable';
import { closeDashboard } from '../../Redux/Slices/Dashboard';

const Dashboard = () => {
    const { isOpen } = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Drawer anchor={'right'} variant="temporary" open={isOpen} onClose={() => dispatch(closeDashboard())} classes={{ paper: classes.container }}>
            <LittleTable title={'尚未檢查'} />
            <LittleTable title={'病患名單'} />
        </Drawer>
    );
};

export default Dashboard;
