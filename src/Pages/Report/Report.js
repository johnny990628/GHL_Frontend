import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton } from '@mui/material'
import { ArrowDropDown, ArrowRight, Assignment, Delete, Visibility } from '@mui/icons-material'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import { fetchReport, openDialog } from '../../Redux/Slices/Dialog'
import { id } from 'date-fns/locale'
import CustomScrollbar from '../../Components/CustomScrollbar/CustomScrollbar'
import { apiDeleteReport, apiGetReports } from '../../Axios/Report'
import { openAlert } from '../../Redux/Slices/Alert'

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
        const res = await apiGetReports(params)
        const { count, results } = res.data
        setData(results)
        setCount(count)
        setPage(Math.ceil(count / params.limit))
    }

    const handlePreviewReport = reportID => dispatch(fetchReport(reportID))

    const handleDeleteReport = reportID =>
        dispatch(
            openAlert({
                alertTitle: '確定刪除該報告?',
                toastTitle: '刪除成功',
                icon: 'success',
                type: 'confirm',
                event: () => apiDeleteReport(reportID).then(() => setCount(0)),
            })
        )

    // const renderSubRow = useCallback(({ row }) => {
    //     return (
    //         <Box>
    //             <Box sx={{ fontSize: '1.5rem' }}>報告紀錄</Box>
    //             <List sx={{ maxHeight: '200123.rem', overflowY: 'auto' }}>
    //                 {row.original.reports.map((report, index) => (
    //                     <ListItem
    //                         key={report.id}
    //                         disablePadding
    //                         onClick={() => handleClick({ patient: row.original, reports: { id: report._id, records: report.records } })}
    //                     >
    //                         <ListItemButton>
    //                             <ListItemIcon>
    //                                 <Assignment />
    //                             </ListItemIcon>
    //                             <ListItemText
    //                                 primary={`第${index + 1}次報告`}
    //                                 secondary={`${new Date(report.updatedAt).toLocaleDateString()}_v${report.records.length}`}
    //                             />
    //                         </ListItemButton>
    //                     </ListItem>
    //                 ))}
    //             </List>
    //         </Box>
    //     )
    // }, [])

    const columns = useMemo(
        () => [
            // {
            //     // Build our expander column
            //     id: 'expander', // Make sure it has an ID
            //     Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
            //         <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? <ArrowDropDown /> : <ArrowRight />}</span>
            //     ),
            //     Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? <ArrowDropDown /> : <ArrowRight />}</span>,
            // },
            {
                accessor: 'status',
                Header: '狀態',
                Cell: row => (
                    <Box className={`${classes.status} ${row.row.original.status === 'pending' && 'processing'}`}>
                        {row.row.original.status === 'pending' ? (
                            <Box className={classes.statusBox}>未完成</Box>
                        ) : (
                            <Box className={classes.statusBox}>已完成</Box>
                        )}
                    </Box>
                ),
            },
            { accessor: 'patientID', Header: '身分證字號', Cell: row => row.row.original.patient.id },
            { accessor: 'name', Header: '姓名', Cell: row => row.row.original.patient.name },
            // { accessor: 'id', Header: '報告ID', Cell: row => row.row.original._id },
            { accessor: 'version', Header: '報告版本', Cell: row => row.row.original.records.length || '無' },
            { accessor: 'procedureCode', Header: '病例代碼', Cell: row => row.row.original.procedureCode },
            { accessor: 'blood', Header: '抽血編號', Cell: row => row.row.original.blood },
            { accessor: 'createdAt', Header: '完成時間', Cell: row => new Date(row.row.original.createdAt).toLocaleString() },
            // { accessor: 'department', Header: '部門單位', Cell: row => row.row.original.patient.department },
            {
                accessor: 'actions',
                Header: '操作',
                Cell: row => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {row.row.original.status === 'finished' && (
                            <>
                                <IconButton onClick={() => handlePreviewReport(row.row.original._id)}>
                                    <Visibility />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteReport(row.row.original._id)}>
                                    <Delete />
                                </IconButton>
                            </>
                        )}
                    </Box>
                ),
            },
        ],
        []
    )

    return (
        <Box className={classes.container}>
            {/* <CustomTable renderSubRow={renderSubRow} data={data.filter(d => d.reports.length > 0)} columns={columns} /> */}
            <CustomTable columns={columns} fetchData={fetchData} data={data} totalPage={page} totalCount={count} />
            <ReportDialog mode="edit" />
        </Box>
    )
}

export default Report
