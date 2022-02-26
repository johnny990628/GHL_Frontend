import React from 'react';
import { Box, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import useStyles from './Style';
import CustomTable from '../../Components/CustomTable/CustomTable';

const columns = [
    { field: 'id', headerName: '身分證字號', width: 250 },
    { field: 'name', headerName: '病患姓名', width: 250 },
    { field: 'birth', headerName: '生日', width: 250 },
    {
        field: 'time',
        type: 'date',
        headerName: '檢查日期',
        width: 200,
    },
    { field: 'contact', headerName: '聯絡方式', width: 300 },
];

const rows = [
    { id: 'A000000000', name: 'Snow', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
    { id: 'A000000001', name: 'Lannister', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
    { id: 'A000000002', name: 'Lannister', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
    { id: 'A000000003', name: 'Stark', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
    { id: 'A000000004', name: 'Targaryen', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
    { id: 'A000000005', name: 'Melisandre', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
    { id: 'A000000006', name: 'Clifford', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
    { id: 'A000000007', name: 'Frances', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
    { id: 'A000000008', name: 'Roxie', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
    { id: 'A000000009', name: 'Roxie', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
    { id: 'A000000010', name: 'Roxie', birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
];

const Patient = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.container}>
                <Box className={classes.title}>病人管理</Box>
                <CustomTable rows={rows} columns={columns} />
            </Box>
            <Fab color="primary" aria-label="add" variant="extended" sx={{ position: 'fixed', right: 100, bottom: 50, p: 3 }}>
                <Add />
                <Box sx={{ fontSize: '1.5rem', marginLeft: '.3rem' }}>新增病人</Box>
            </Fab>
        </>
    );
};

export default Patient;
