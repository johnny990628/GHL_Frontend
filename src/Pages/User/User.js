import React, { useState, useEffect, useMemo } from 'react'
import { Box, IconButton } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import { fetchReport } from '../../Redux/Slices/Dialog'

import { apiDeleteReport, apiGetReports } from '../../Axios/Report'
import { openAlert } from '../../Redux/Slices/Alert'
import { apiDeleteUser, apiGetUsers } from '../../Axios/User'

const Report = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)

    const { isOpen } = useSelector(state => state.dialog.report)

    useEffect(() => {
        isOpen || setCount(0)
    }, [isOpen])

    const fetchData = async params => {
        const res = await apiGetUsers(params)
        const { count, results } = res.data
        setData(results)
        setCount(count)
        setPage(Math.ceil(count / params.limit))
    }

    const handleDeleteUser = userID =>
        dispatch(
            openAlert({
                alertTitle: '確定刪除該用戶?',
                toastTitle: '刪除成功',
                icon: 'success',
                type: 'confirm',
                event: () => apiDeleteUser(userID).then(() => setCount(0)),
            })
        )

    const columns = useMemo(
        () => [
            {
                accessor: 'status',
                Header: '狀態',
                Cell: row => (
                    <Box className={`${classes.status} ${row.row.original.roles.find(r => r.level === 3) === 'pending' || 'processing'}`}>
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
            <CustomTable columns={columns} fetchData={fetchData} data={data} totalPage={page} totalCount={count} />
            <ReportDialog mode="edit" />
        </Box>
    )
}

export default Report
