import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { openSnackbar } from '../../Redux/Slices/Snackbar'

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from '@mui/x-data-grid'

import useStyles from './Style'

const CustomToolbar = ({ handleDelete }) => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport
                csvOptions={{ fileName: '診所檔案', utf8WithBom: true }}
                printOptions={{ hideToolbar: true, hideFooter: true }}
            />
            <Button startIcon={<Delete />} variant="text" color="primary" onClick={handleDelete}>
                Delete
            </Button>
        </GridToolbarContainer>
    )
}

const CustomTable = ({ deleteAction, data, columns, loading }) => {
    const [pageSize, setPageSize] = useState(5)
    const [selectionModel, setSelectionModel] = useState([])
    const dispatch = useDispatch()

    const classes = useStyles()

    const handleDelete = () => {
        dispatch(deleteAction(selectionModel))
        dispatch(openSnackbar('刪除成功'))
        // setData(rows => rows.filter(r => !selectionModel.includes(r.id)))
    }
    return (
        <Box className={classes.container}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                onSelectionModelChange={setSelectionModel}
                selectionModel={selectionModel}
                checkboxSelection
                components={{ Toolbar: CustomToolbar }}
                componentsProps={{ toolbar: { handleDelete } }}
                className={classes.table}
                loading={loading}
            />
        </Box>
    )
}

export default CustomTable
