import React, { useMemo, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControlLabel, FormGroup, IconButton, Switch } from '@mui/material'
import { useDebouncedCallback } from 'use-debounce'

import useStyles from './Style'

import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import CustomInput from '../../Components/CustomForm/CustomInput'
import GlobalFilter from './../../Components/GlobalFilter/GlobalFilter'
import { ArrowDropDown, Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { openAlert } from '../../Redux/Slices/Alert'
import { activeDepartment, createDepartment, deleteDepartment, fetchDepartment } from '../../Redux/Slices/Department'

const Image = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { results, count, page, loading } = useSelector(state => state.department)

    const fetchData = async params => {
        dispatch(fetchDepartment(params))
    }

    const columns = useMemo(
        () => [
            {
                accessor: 'active',
                Header: '啟用',
                Cell: row => {
                    const { _id, active } = row.row.original
                    return (
                        <Switch
                            checked={active}
                            onChange={e => dispatch(activeDepartment({ departmentID: _id, active: e.target.checked }))}
                        />
                    )
                },
            },
            { accessor: 'name', Header: '部門名稱', Cell: row => row.row.original.name },
            { accessor: 'address', Header: '部門地址', Cell: row => row.row.original.address },
            {
                accessor: 'action',
                Header: '操作',
                Cell: row => {
                    const { _id, name, address } = row.row.original
                    return (
                        <Box>
                            <IconButton
                                onClick={() => {
                                    dispatch(
                                        openAlert({
                                            alertTitle: '確定刪除該部門?',
                                            toastTitle: '刪除成功',
                                            text: `${name} - ${address}`,
                                            icon: 'success',
                                            type: 'confirm',
                                            event: () => dispatch(deleteDepartment(_id)),
                                        })
                                    )
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Box>
                    )
                },
            },
        ],
        []
    )

    return (
        <Box className={classes.container}>
            <CustomTable
                columns={columns}
                fetchData={fetchData}
                data={results}
                loading={loading}
                totalPage={page}
                totalCount={count}
                GlobalFilter={GlobalFilter}
            />
            <ReportDialog mode="edit" />
        </Box>
    )
}

export default Image
