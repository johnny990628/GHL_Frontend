import React, { useState } from 'react';
import { Drawer } from '@mui/material';

import useStyles from './Style';
import LittleTable from '../LittleTable/LittleTable';

const AnotherSidebar = ({ open, setClose }) => {
    const classes = useStyles();

    return (
        <Drawer anchor={'right'} variant="temporary" open={open} onClose={setClose} classes={{ paper: classes.container }}>
            <LittleTable title={'尚未檢查'} />
            <LittleTable title={'病患名單'} />
        </Drawer>
    );
};

export default AnotherSidebar;
