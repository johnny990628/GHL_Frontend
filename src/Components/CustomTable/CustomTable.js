import React, { useEffect, useState } from 'react'
import { Box, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { openSnackbar } from '../../Redux/Slices/Snackbar'
import { useTable } from 'react-table'
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
    // const [pageSize, setPageSize] = useState(5)
    // const [selectionModel, setSelectionModel] = useState([])
    // const dispatch = useDispatch()

    const classes = useStyles()

    const tableInstance = useTable({ columns, data })
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    // const handleDelete = () => {
    //     dispatch(deleteAction(selectionModel))
    //     dispatch(openSnackbar('刪除成功'))
    // }
    return (
        <TableContainer className={classes.container}>
            <Table {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps()} sx={{ fontSize: '1.2rem' }}>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>

                <TableBody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                ))}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {/* <DataGrid
                rows={rows}
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
            /> */}
        </TableContainer>
    )
}

export default CustomTable
