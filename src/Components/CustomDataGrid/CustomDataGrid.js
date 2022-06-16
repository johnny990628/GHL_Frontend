import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import useStyles from './Style'

const CustomDataGrid = ({ data, columns, selection, setSelection }) => {
    const classes = useStyles()

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
            className={classes.table}
        />
    )
}

export default CustomDataGrid
