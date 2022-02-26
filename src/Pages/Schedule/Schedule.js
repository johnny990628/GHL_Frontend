import React from 'react';
import { Box, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import useStyles from './Style';
import CustomTable from '../../Components/CustomTable/CustomTable';

const columns = [
    { field: 'id', headerName: '身分證字號', width: 250 },
    { field: 'name', headerName: '病患姓名', width: 250 },
    {
        field: 'age',
        headerName: '年齡',
        width: 200,
    },
    { field: 'doctor', headerName: '醫師', width: 200 },
    { field: 'time', headerName: '時間', type: 'date', width: 300 },
];

const rows = [
    { id: 'A000000001', doctor: '楊醫師', name: 'Lannister', age: 42, time: '1700-1800' },
    { id: 'A000000000', doctor: '楊醫師', name: 'Snow', age: 35, time: '1700-1800' },
    { id: 'A000000002', doctor: '楊醫師', name: 'Lannister', age: 45, time: '1400-1500' },
    { id: 'A000000003', doctor: '楊醫師', name: 'Stark', age: 16, time: '1700-1800' },
    { id: 'A000000004', doctor: '楊醫師', name: 'Targaryen', age: 62, time: '1700-1800' },
    { id: 'A000000005', doctor: '楊醫師', name: 'Melisandre', age: 150, time: '1300-1400' },
    { id: 'A000000006', doctor: '楊醫師', name: 'Clifford', age: 44, time: '1700-1800' },
    { id: 'A000000007', doctor: '楊醫師', name: 'Frances', age: 36, time: '1700-1800' },
    { id: 'A000000008', doctor: '楊醫師', name: 'Roxie', age: 65, time: '1700-1800' },
    { id: 'A000000009', doctor: '楊醫師', name: 'Roxie', age: 65, time: '1700-1800' },
    { id: 'A000000010', doctor: '楊醫師', name: 'Roxie', age: 65, time: '1700-1800' },
];

const Schedule = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.container}>
                <Box className={classes.title}>排程管理</Box>
                <CustomTable rows={rows} columns={columns} />
            </Box>
            <Fab color="primary" aria-label="add" variant="extended" sx={{ position: 'fixed', right: 100, bottom: 50, p: 3 }}>
                <Add />
                <Box sx={{ fontSize: '1.5rem', marginLeft: '.3rem' }}>新增排程</Box>
            </Fab>
        </>
    );
};

export default Schedule;
