import React, { useEffect, useMemo } from 'react'
import { Box, IconButton } from '@mui/material'
import { Delete, Visibility } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Style'

import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import GlobalFilter from './../../Components/GlobalFilter/GlobalFilter'
import { fetchReportByReportID } from '../../Redux/Slices/Dialog'
import { deleteReport, fetchReport, reportTrigger } from '../../Redux/Slices/Report'
import { openAlert } from '../../Redux/Slices/Alert'
import Authorized from './../../Components/Authorized/Authorized'

const Report = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { results, count, page, loading } = useSelector(state => state.report)
    const { user } = useSelector(state => state.auth)
    const { isOpen } = useSelector(state => state.dialog.report)

    useEffect(() => {
        isOpen || dispatch(reportTrigger())
    }, [isOpen])

    const fetchData = async params => {
        dispatch(fetchReport(params))
    }

    const handlePreviewReport = reportID => dispatch(fetchReportByReportID(reportID))

    const handleDeleteReport = reportID =>
        dispatch(
            openAlert({
                alertTitle: '確定刪除該報告?',
                toastTitle: '刪除成功',
                icon: 'success',
                type: 'confirm',
                event: () => dispatch(deleteReport(reportID)),
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
            {
                accessor: 'patientID',
                Header: '身分證字號',
                Cell: row => (row.row.original.patient ? row.row.original.patient.id : row.row.original.patientID),
            },
            { accessor: 'name', Header: '姓名', Cell: row => (row.row.original.patient ? row.row.original.patient.name : '無病人資料') },
            { accessor: 'version', Header: '報告版本', Cell: row => row.row.original.records.length || '無' },
            { accessor: 'procedureCode', Header: '病例代碼', Cell: row => row.row.original.procedureCode },
            { accessor: 'blood', Header: '抽血編號', Cell: row => row.row.original.blood },
            {
                accessor: 'user',
                Header: '完成者',
                Cell: row => (row.row.original.user ? row.row.original.user.name : row.row.original.userID || '無'),
            },
            { accessor: 'createdAt', Header: '完成時間', Cell: row => new Date(row.row.original.createdAt).toLocaleString() },
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
                                <Authorized currentRole={user.role} authority={[3, 2]} noMatch={<></>}>
                                    <IconButton onClick={() => handleDeleteReport(row.row.original._id)}>
                                        <Delete />
                                    </IconButton>
                                </Authorized>
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
