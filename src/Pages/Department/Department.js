import React, { useMemo, useState } from 'react'
import { Box, Button, Switch } from '@mui/material'

import useStyles from './Style'

import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'

import GlobalFilter from './../../Components/GlobalFilter/GlobalFilter'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { openAlert } from '../../Redux/Slices/Alert'
import { activeDepartment, deleteDepartment, fetchDepartment } from '../../Redux/Slices/Department'
import { openDialog } from '../../Redux/Slices/Dialog'
import CustomDialog from '../../Components/CustomDialog/CustomDialog'

const Department = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { results, count, page, loading } = useSelector(state => state.department)

    const fetchData = async params => {
        dispatch(fetchDepartment(params))
    }

    const columns = useMemo(
        () => [
            { accessor: 'name', Header: '部門名稱', Cell: row => row.row.original.name },
            { accessor: 'address', Header: '部門地址', Cell: row => row.row.original.address },
            {
                accessor: 'action',
                Header: '操作',
                Cell: row => {
                    return (
                        <Button
                            startIcon={<Edit color="contrast" />}
                            sx={{ fontSize: '1.1rem', color: 'contrast.main' }}
                            onClick={() => {
                                dispatch(openDialog({ row: row.row.original, type: 'department', mode: 'edit' }))
                            }}
                        >
                            編輯
                        </Button>
                    )
                },
            },
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
        </Box>
    )
}

export default Department
