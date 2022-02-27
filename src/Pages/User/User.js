import React from 'react';
import { Box } from '@mui/material';
import useStyles from './Style';
import CustomTable from '../../Components/CustomTable/CustomTable';

const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'name', headerName: '用戶名', width: 250 },
    { field: 'username', headerName: '帳號', width: 250 },
    { field: 'permission', headerName: '權限', width: 300 },
];

const rows = [
    { id: 'A000000000', name: 'Snow', username: 'xcv8787', permission: 'admin' },
    { id: 'A000000001', name: 'Lannister', username: 'xcv8787', permission: 'user' },
    { id: 'A000000002', name: 'Lannister', username: 'xcv8787', permission: 'user' },
    { id: 'A000000003', name: 'Stark', username: 'xcv8787', permission: 'admin' },
    { id: 'A000000004', name: 'Targaryen', username: 'xcv8787', permission: 'doctor' },
    { id: 'A000000005', name: 'Melisandre', username: 'xcv8787', permission: 'admin' },
    { id: 'A000000006', name: 'Clifford', username: 'xcv8787', permission: 'doctor' },
];

const User = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.container}>
                <Box className={classes.title}>使用者管理</Box>
                <CustomTable rows={rows} columns={columns} />
            </Box>
        </>
    );
};

export default User;
