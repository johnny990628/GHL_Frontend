import React, { useState } from 'react';
import { Box } from '@mui/material';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from '@mui/x-data-grid';

import useStyles from './Style';

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport csvOptions={{ fileName: '診所檔案', utf8WithBom: true }} printOptions={{ hideToolbar: true, hideFooter: true }} />
        </GridToolbarContainer>
    );
};

const CustomTable = ({ rows, columns }) => {
    const [pageSize, setPageSize] = useState(5);
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                editMode="row"
                checkboxSelection
                components={{ Toolbar: CustomToolbar }}
                sx={{ fontSize: '1.3rem', backgroundColor: '#F5D7DE', p: 2, borderRadius: '1rem' }}
            />
        </Box>
    );
};

export default CustomTable;
