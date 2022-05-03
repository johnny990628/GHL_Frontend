import React, { Fragment, useState, useEffect } from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material'
import { useTheme } from '@mui/styles'
import { Search, ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import { useTable, useGlobalFilter, usePagination, useSortBy, useExpanded } from 'react-table'
import { useDebouncedCallback } from 'use-debounce'
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'

import useStyles from './Style'

const CustomTable = ({ columns, renderSubRow, fetchData, data, totalPage, totalCount }) => {
    const [search, setSearch] = useState('')

    const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
        // const count = preGlobalFilteredRows.length
        const [value, setValue] = useState('')

        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem' }}>
                {/* <Box className={classes.tableHeaderTotal}>{`總共${count}筆資料`}</Box> */}
                <Search sx={{ mr: 1 }} />
                <TextField
                    variant="standard"
                    value={value}
                    onChange={e => {
                        setValue(e.target.value)
                    }}
                    onKeyPress={e => {
                        e.key === 'Enter' && setSearch(value)
                    }}
                    placeholder={`${search && `${search}...`}${totalCount}筆資料`}
                    sx={{
                        marginRight: '1rem',
                    }}
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        setSearch(value)
                    }}
                    sx={{ fontSize: '1.1rem ', padding: '.1rem', marginRight: '.5rem' }}
                >
                    搜尋
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setValue('')
                        setSearch('')
                    }}
                    sx={{ fontSize: '1.1rem ', padding: '.1rem' }}
                    className={classes.clearButton}
                >
                    清除
                </Button>
            </Box>
        )
    }

    const classes = useStyles()
    const theme = useTheme()

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter, sortBy },
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        visibleColumns,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                sortBy: [{ id: 'createdAt', desc: true }],
                pageIndex: 0,
            },
            manualPagination: true,
            pageCount: totalPage,
            autoResetSortBy: false,
            autoResetPage: true,
            autoResetFilters: false,
        },
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination
    )

    useEffect(() => {
        fetchData({ limit: pageSize, offset: pageIndex, search, sort: sortBy[0]?.id, desc: sortBy[0]?.desc ? -1 : 1 })
    }, [pageIndex, pageSize, sortBy, search, totalCount])

    // const handleDelete = () => {
    //     dispatch(deleteAction(selectionModel))
    //     dispatch(openSnackbar('刪除成功'))
    // }
    return (
        <Box className={classes.container}>
            <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

            <TableContainer {...getTableProps()} sx={{ height: '82%' }}>
                <CustomScrollbar>
                    <Table stickyHeader>
                        <TableHead>
                            {headerGroups.map(headerGroup => (
                                <TableRow {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <TableCell
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className={classes.tableHeader}
                                        >
                                            <Box sx={{ display: 'flex' }}>
                                                {column.render('Header')}
                                                <Box>
                                                    {column.isSorted ? column.isSortedDesc ? <ArrowDropDown /> : <ArrowDropUp /> : ''}
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>

                        <TableBody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row)
                                return (
                                    <Fragment key={row.getRowProps().key}>
                                        <TableRow {...row.getRowProps()}>
                                            {row.cells.map(cell => (
                                                <TableCell
                                                    {...cell.getCellProps()}
                                                    sx={{
                                                        fontSize: '1rem',
                                                        [theme.breakpoints.down('lg')]: {
                                                            fontSize: '.9rem',
                                                        },
                                                    }}
                                                >
                                                    {cell.render('Cell')}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        {row.isExpanded ? (
                                            <TableRow>
                                                <TableCell colSpan={visibleColumns.length}>{renderSubRow({ row })}</TableCell>
                                            </TableRow>
                                        ) : null}
                                    </Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CustomScrollbar>
            </TableContainer>

            <Box className={classes.tableFooter}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="rows">列數</InputLabel>
                    <Select
                        labelId="rows"
                        label="列數"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        className={classes.tableFooterItem}
                    >
                        {[5, 10, 20, 30, 40].map(pageSize => (
                            <MenuItem key={pageSize} value={pageSize}>
                                {pageSize}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box className={classes.tableFooterItem}>
                    <TextField
                        type="number"
                        variant="standard"
                        label="頁數"
                        defaultValue={pageIndex + 1}
                        value={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </Box>

                <Box className={classes.tableFooterItem} sx={{ fontSize: '1.1rem' }}>{`第${pageIndex + 1}/${pageOptions.length}頁`}</Box>

                <ButtonGroup variant="outlined" className={classes.tableFooterItem}>
                    <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </Button>
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </Button>
                    <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}

export default CustomTable
