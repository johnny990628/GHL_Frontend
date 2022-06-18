import React, { useMemo } from 'react'
import { Box, IconButton } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import { deleteUser, fetchUser } from '../../Redux/Slices/User'

import { openAlert } from '../../Redux/Slices/Alert'

const Report = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { results, count, page } = useSelector(state => state.user)

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
            {
                accessor: 'status',
                Header: '狀態',
                Cell: row => (
                    <Box className={`${classes.status} ${row.row.original.roles.find(r => r.level === 3) && 'processing'}`}>
                        {row.row.original.roles.find(r => r.level === 3) ? (
                            <Box className={classes.statusBox}>管理者</Box>
                        ) : (
                            <Box className={classes.statusBox}>使用者</Box>
                        )}
                    </Box>
                ),
            },
            { accessor: 'username', Header: '用戶名', Cell: row => row.row.original.username },
            { accessor: 'name', Header: '姓名', Cell: row => row.row.original.name },
            { accessor: 'createdAt', Header: '註冊時間', Cell: row => new Date(row.row.original.createdAt).toLocaleString() },
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
            <CustomTable columns={columns} fetchData={fetchData} data={results} totalPage={page} totalCount={count} />
            <ReportDialog mode="edit" />
        </Box>
    )
}

export default Report
