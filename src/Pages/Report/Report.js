import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, IconButton } from '@mui/material'
import {
    AccessTime,
    AirlineSeatIndividualSuite,
    ArrowForwardIos,
    CalendarToday,
    Check,
    CheckBox,
    CheckBoxOutlineBlank,
    Close,
    CloudDone,
    Delete,
    Visibility,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Style'

import Gallbladder from '../../Assets/OrganJson/gallbladder.json'
import Kidney from '../../Assets/OrganJson/kidney.json'
import Liver from '../../Assets/OrganJson/liver.json'
import Pancreas from '../../Assets/OrganJson/pancreas.json'
import Spleen from '../../Assets/OrganJson/spleen.json'
import Suggestion from '../../Assets/OrganJson/suggestion.json'

import CustomTable from '../../Components/CustomTable/CustomTable'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import GlobalFilter from './../../Components/GlobalFilter/GlobalFilter'
import { fetchReportByReportID } from '../../Redux/Slices/Dialog'
import { deleteReport, fetchReport, reportTrigger } from '../../Redux/Slices/Report'
import { openAlert } from '../../Redux/Slices/Alert'
import Authorized from './../../Components/Authorized/Authorized'
import { fetchSchedule } from '../../Redux/Slices/Schedule'
import CustomReportForm from '../../Components/CustomReport/CustomReportForm'
import { createReport, resetReport } from '../../Redux/Slices/ReportForm'
import { v4 } from 'uuid'
import { fillReport } from '../../Redux/Slices/ReportForm'
import { removeSchedule } from '../../Redux/Slices/Schedule'
import { apiAddWorklist } from '../../Axios/WorkList'

const Report = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [isExamination, setIsExamination] = useState(false)
    const [selection, setSelection] = useState({})

    const { schedules, count, page, loading } = useSelector(state => state.schedule)
    const { user } = useSelector(state => state.auth)
    const { isOpen } = useSelector(state => state.dialog.report)
    const report = useSelector(state => state.reportForm)

    useEffect(() => {
        isOpen || dispatch(reportTrigger())
    }, [isOpen])

    const fetchData = async params => {
        dispatch(fetchSchedule(params))
    }

    const handlePreviewReport = reportID => dispatch(fetchReportByReportID(reportID))

    const handleDeleteReport = schedule =>
        dispatch(
            openAlert({
                alertTitle: '確定刪除?將會刪除所有相關資料',
                toastTitle: '刪除成功',
                text: `${schedule.patient.name}`,
                icon: 'success',
                type: 'confirm',
                event: () => dispatch(removeSchedule(schedule._id)),
            })
        )

    const handleExamination = schedule => {
        const records = schedule.report.records
        if (records.length > 0) {
            dispatch(fillReport({ report: records[records.length - 1] }))
        }
        setSelection(schedule)
        setIsExamination(true)
    }
    const handleCancelExamination = () => {
        setSelection({})
        setIsExamination(false)
        dispatch(resetReport())
    }

    const handleSubmit = () => {
        dispatch(
            createReport({
                patientID: selection.patient.id,
                reportID: selection.reportID,
                scheduleID: selection._id,
                data: { report: { ...report, id: v4() }, userID: user._id },
            })
        )
        setSelection({})
        setIsExamination(false)
        dispatch(
            openAlert({
                toastTitle: '報告完成',
                text: `${selection.patient.name}`,
                icon: 'success',
            })
        )
    }

    const columns = useMemo(
        () => [
            {
                accessor: 'name',
                Header: '姓名',
                Cell: row => (
                    <Box sx={{ fontSize: '1.3rem' }}>{row.row.original.patient ? row.row.original.patient.name : '無病人資料'}</Box>
                ),
            },
            {
                accessor: 'patientID',
                Header: '身分證字號',
                Cell: row => (row.row.original.patient ? row.row.original.patient.id : row.row.original.patientID),
            },
            { accessor: 'version', Header: '報告版本', Cell: row => row.row.original?.report?.records.length || '無' },
            {
                accessor: 'user',
                Header: '完成者',
                Cell: row => (row.row.original.user ? row.row.original.user.name : row.row.original.userID || '無'),
            },
            {
                accessor: 'actions',
                Header: '操作',
                Cell: row => (
                    <Box>
                        <Button
                            startIcon={<Visibility color="contrast" />}
                            sx={{ fontSize: '1.1rem', color: 'contrast.main' }}
                            onClick={() => handlePreviewReport(row.row.original.reportID)}
                        >
                            檢視
                        </Button>
                        <Button
                            startIcon={<Delete />}
                            sx={{ color: 'red.main', fontSize: '1.1rem' }}
                            onClick={() => handleDeleteReport(row.row.original)}
                        >
                            刪除
                        </Button>
                        {/* <Button
                            startIcon={<CloudDone />}
                            color="primary"
                            sx={{ color: 'primary.main', fontSize: '1.1rem' }}
                            onClick={() => {
                                apiAddWorklist(row.row.original.patient.id)
                                    .then(res =>
                                        dispatch(
                                            openAlert({
                                                toastTitle: '開單成功',
                                                text: `新增workList ${res.data.name}`,
                                                icon: 'success',
                                            })
                                        )
                                    )
                                    .catch(err =>
                                        dispatch(
                                            openAlert({
                                                toastTitle: '開單失敗',
                                                text: err.response.data.message,
                                                icon: 'error',
                                            })
                                        )
                                    )
                            }}
                        >
                            超音波開單
                        </Button> */}
                    </Box>
                ),
            },
            {
                accessor: 'createdAt',
                Header: '完成時間',
                Cell: row => (
                    <Box>
                        <Box>{new Date(row.row.original.createdAt).toLocaleDateString()}</Box>
                        <Box sx={{ fontSize: '.8rem', color: 'gray.main' }}>
                            {new Date(row.row.original.createdAt).toLocaleTimeString()}
                        </Box>
                    </Box>
                ),
            },

            {
                accessor: 'status',
                Header: '狀態',
                Cell: row => {
                    const scheduleStatus = () => {
                        switch (row.row.original?.status) {
                            case 'wait-examination':
                                return {
                                    status: 'wait-examination',
                                    class: 'examination',
                                    text: '撰寫報告',
                                    icon: <CheckBoxOutlineBlank />,
                                }
                            case 'on-call':
                                return { status: 'on-call', class: 'call', text: '檢查中', icon: <AirlineSeatIndividualSuite /> }
                            case 'finish':
                                return { status: 'finish', class: 'finish', text: '編輯報告', icon: <CheckBox /> }
                            default:
                                return { status: 'yet', class: 'yet', text: '等待排程', icon: <CalendarToday /> }
                        }
                    }
                    const status = scheduleStatus()
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                                className={`${classes.status} ${status.class} `}
                                startIcon={status.icon}
                                fullWidth
                                onClick={() => handleExamination(row.row.original)}
                            >
                                <Box className={classes.statusBox}>{status.text}</Box>
                            </Button>
                        </Box>
                    )
                },
            },
        ],
        []
    )

    return (
        <Box className={classes.container}>
            {isExamination ? (
                <>
                    <CustomReportForm
                        lists={[Liver, Gallbladder, Kidney, Pancreas, Spleen, Suggestion]}
                        patient={selection.patient}
                        mode="create"
                    />
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', padding: '2rem 1rem' }}>
                        <Button
                            variant="contained"
                            startIcon={<Check />}
                            sx={{ borderRadius: '2rem', height: '2.4rem', marginRight: '1rem' }}
                            onClick={() => handleSubmit()}
                        >
                            完成報告
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<Close />}
                            sx={{ borderRadius: '2rem', height: '2.4em' }}
                            onClick={() => handleCancelExamination()}
                        >
                            取消
                        </Button>
                    </Box>
                </>
            ) : (
                <CustomTable
                    columns={columns}
                    fetchData={fetchData}
                    data={schedules}
                    loading={loading}
                    totalPage={page}
                    totalCount={count}
                    GlobalFilter={GlobalFilter}
                />
            )}
            <ReportDialog />
        </Box>
    )
}

export default Report
