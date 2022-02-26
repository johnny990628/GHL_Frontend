import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useStyles from './Style';

const CustomTable = ({ rows, columns }) => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={9}
                autoHeight
                checkboxSelection
                sx={{ fontSize: '1.3rem', backgroundColor: '#F5D7DE', p: 2, borderRadius: '1rem' }}
            />
        </Box>
    );
};

export default CustomTable;
