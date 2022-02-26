import React from 'react';
import { Box, Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add } from '@mui/icons-material';
import useStyles from './Style';

const columns = [
    { field: 'id', headerName: '身分證字號', width: 250 },
    { field: 'firstName', headerName: '姓氏', width: 200 },
    { field: 'lastName', headerName: '名', width: 250 },
    {
        field: 'age',
        headerName: '年齡',
        width: 150,
    },
    { field: 'time', headerName: '時間', type: 'date', width: 250 },
];

const rows = [
    { id: 'A000000000', lastName: 'Snow', firstName: 'Jon', age: 35, time: '1700-1800' },
    { id: 'A000000001', lastName: 'Lannister', firstName: 'Cersei', age: 42, time: '1700-1800' },
    { id: 'A000000002', lastName: 'Lannister', firstName: 'Jaime', age: 45, time: '1400-1500' },
    { id: 'A000000003', lastName: 'Stark', firstName: 'Arya', age: 16, time: '1700-1800' },
    { id: 'A000000004', lastName: 'Targaryen', firstName: 'Daenerys', age: 62, time: '1700-1800' },
    { id: 'A000000005', lastName: 'Melisandre', firstName: 'John', age: 150, time: '1300-1400' },
    { id: 'A000000006', lastName: 'Clifford', firstName: 'Ferrara', age: 44, time: '1700-1800' },
    { id: 'A000000007', lastName: 'Frances', firstName: 'Rossini', age: 36, time: '1700-1800' },
    { id: 'A000000008', lastName: 'Roxie', firstName: 'Harvey', age: 65, time: '1700-1800' },
    { id: 'A000000009', lastName: 'Roxie', firstName: 'Harvey', age: 65, time: '1700-1800' },
    { id: 'A000000010', lastName: 'Roxie', firstName: 'Harvey', age: 65, time: '1700-1800' },
];

const Schedule = () => {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.container}>
                <Box className={classes.title}>排程</Box>
                <Box className={classes.table}>
                    <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection sx={{ fontSize: '1.3rem', backgroundColor: '#F5D7DE', p: 2 }} />
                </Box>
            </Box>
            <Fab color="primary" aria-label="add" variant="extended" sx={{ position: 'fixed', right: 80, bottom: 50, p: 3 }}>
                <Add />
                <Box sx={{ fontSize: '1.5rem', marginLeft: '.3rem' }}>新增排程</Box>
            </Fab>
        </>
    );
};

export default Schedule;
