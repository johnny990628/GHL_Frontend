import React, { useEffect, useState } from 'react';
import { Box, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import useStyles from './Style';
import CustomTable from '../../Components/CustomTable/CustomTable';

import { useSelector, useDispatch } from 'react-redux';
import { fetchPatients } from '../../Redux/Slices/Patient';

const columns = [
    { field: 'id', headerName: '身分證字號', width: 200, editable: true },
    { field: 'name', headerName: '病患姓名', width: 200, editable: true },
    { field: 'birth', headerName: '生日', type: 'date', width: 200, editable: true },
    {
        field: 'time',
        type: 'date',
        headerName: '檢查日期',
        width: 200,
        editable: true,
    },
    { field: 'contact', headerName: '聯絡方式', width: 150, editable: true },
];

const Patient = () => {
    const classes = useStyles();
    const patients = useSelector((state) => state.patients);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPatients());
    }, []);

    return (
        <>
            <CustomTable data={patients.data} columns={columns} loading={patients.loading} />
        </>
    );
};

export default Patient;
