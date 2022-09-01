import React, { useMemo } from 'react'
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import { AssignmentTurnedIn, Delete, Edit } from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import GlobalFilter from './../../Components/GlobalFilter/GlobalFilter'
import { deleteUser, fetchUser, updateUser } from '../../Redux/Slices/User'

import { openAlert } from '../../Redux/Slices/Alert'

const Report = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { results, count, page, loading } = useSelector(state => state.user)

    const fetchData = async params => {
        dispatch(fetchUser(params))
    }

    const handleDeleteUser = userID =>
        dispatch(
            openAlert({
                alertTitle: '確定刪除該用戶?',
                toastTitle: '刪除成功',
                icon: 'success',
                type: 'confirm',
                event: () => dispatch(deleteUser(userID)),
            })
        )

    const columns = useMemo(
        () => [
            { accessor: 'username', Header: '用戶名', Cell: row => row.row.original.username },
            { accessor: 'name', Header: '姓名', Cell: row => row.row.original.name },
            { accessor: 'createdAt', Header: '註冊時間', Cell: row => new Date(row.row.original.createdAt).toLocaleString() },
            {
                accessor: 'status',
                Header: '狀態',
                Cell: row => {
                    const handleChange = e => {
                        dispatch(updateUser({ id: row.row.original._id, data: { role: e.target.value } }))
                    }
                    return (
                        <Select variant="standard" fullWidth value={row.row.original.role} onChange={handleChange}>
                            <MenuItem value={0}>等待審核</MenuItem>
                            <MenuItem value={1}>行政及護理師</MenuItem>
                            <MenuItem value={2}>醫師</MenuItem>
                            <MenuItem value={3}>管理員</MenuItem>
                        </Select>
                    )
                },
            },
            {
                accessor: 'actions',
                Header: '操作',
                Cell: row => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => handleDeleteUser(row.row.original._id)}>
                            <Delete />
                        </IconButton>
                    </Box>
                ),
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

export default Report
