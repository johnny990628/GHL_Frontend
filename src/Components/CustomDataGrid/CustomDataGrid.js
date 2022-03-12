import React, { useState } from 'react'

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from '@mui/x-data-grid'
import { useDispatch } from 'react-redux'
import useStyles from './Style'

const CustomDataGrid = ({ data, columns, loading, selection, setSelection }) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    return (
        <DataGrid
            rows={data}
            columns={columns}
            pageSize={100}
            onSelectionModelChange={setSelection}
            selectionModel={selection}
            checkboxSelection={false}
            autoPageSize
            hideFooter
            // components={{ Toolbar: CustomToolbar }}
            // componentsProps={{ toolbar: { handleDelete } }}
            className={classes.table}
            // loading={loading}
        />
    )
}

export default CustomDataGrid
