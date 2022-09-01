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
    Grid,
    CircularProgress,
} from '@mui/material'
import { useTheme } from '@mui/styles'
import { Search, ArrowDropUp, ArrowDropDown } from '@mui/icons-material'
import { useTable, useGlobalFilter, usePagination, useSortBy, useExpanded } from 'react-table'

import useStyles from './Style'

import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'

const CustomTable = ({ columns, renderSubRow, fetchData, data, loading, totalPage, totalCount, StatusRadioGroup, GlobalFilter }) => {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')

    const classes = useStyles()
    const theme = useTheme()

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,

        state: { pageIndex, pageSize, sortBy },
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
        if (search) setStatus('all')
        fetchData({ limit: pageSize, offset: pageIndex, search, status, sort: sortBy[0]?.id, desc: sortBy[0]?.desc ? -1 : 1 })
    }, [pageIndex, pageSize, sortBy, search, totalCount, status])

    return (
        <Grid container direction="column" wrap="nowrap" className={classes.container}>
            <Grid container item xs={1}>
                <Grid item xs={StatusRadioGroup ? 7 : 12} sx={{ display: 'flex', justifyContent: StatusRadioGroup ? 'right' : 'center' }}>
                    {GlobalFilter && <GlobalFilter setSearch={setSearch} search={search} totalCount={totalCount} />}
                </Grid>
                <Grid item xs={StatusRadioGroup ? 5 : 0} sx={{ display: 'flex', justifyContent: 'right' }}>
                    {StatusRadioGroup && <StatusRadioGroup status={status} setStatus={setStatus} />}
                </Grid>
            </Grid>
            <Grid item xs={9} {...getTableProps()}>
                {loading ? (
                    <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
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
                )}
            </Grid>
            <Grid item xs={2} className={classes.tableFooter}>
                {/* <Box className={classes.tableFooterItem}>
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
                </Box> */}

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    <Box className={classes.tableFooterItem} sx={{ fontSize: '1.1rem' }}>{`總共${totalCount}筆資料`}</Box>
                    <Box className={classes.tableFooterItem} sx={{ fontSize: '1.1rem' }}>
                        {`第${pageIndex + 1}/${pageOptions.length}頁`}
                    </Box>

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
            </Grid>
        </Grid>
    )
}

export default CustomTable
