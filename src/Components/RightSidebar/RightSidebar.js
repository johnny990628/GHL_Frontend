import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from '@mui/material';

import useStyles from './Style';
import LittleTable from '../LittleTable/LittleTable';
import { closeDrawer } from '../../Redux/Slices/Drawer';

const AnotherSidebar = () => {
    const { open } = useSelector((state) => state.drawer);
    const dispatch = useDispatch();
    const classes = useStyles();

    return (
        <Drawer anchor={'right'} variant="temporary" open={open} onClose={() => dispatch(closeDrawer())} classes={{ paper: classes.container }}>
            <LittleTable title={'尚未檢查'} />
            <LittleTable title={'病患名單'} />
        </Drawer>
    );
};

export default AnotherSidebar;
