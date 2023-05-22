import React, { useCallback, useMemo } from 'react'
import { Box, Button } from '@mui/material'
import { CalendarToday, Delete, Edit, Check, AccessTime, AirlineSeatIndividualSuite } from '@mui/icons-material'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'

import GlobalFilter from '../../Components/GlobalFilter/GlobalFilter'

import { useDispatch, useSelector } from 'react-redux'
import { deletePatient, fetchPatients } from '../../Redux/Slices/Patient'
import { openDialog } from '../../Redux/Slices/Dialog'
import { openAlert } from '../../Redux/Slices/Alert'
import { apiCheckExists } from '../../Axios/Exists'
import { addSchedule, changeScheduleStatus, removeSchedule } from '../../Redux/Slices/Schedule'
import CustomDialog from '../../Components/CustomDialog/CustomDialog'

const Patient = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { data, count, page, loading } = useSelector(state => state.patients)

    const columns = useMemo(
        () => [
            { accessor: 'name', Header: '姓名', Cell: row => <Box sx={{ fontSize: '1.3rem' }}>{row.row.original.name}</Box> },
            { accessor: 'id', Header: '身分證字號' },
            { accessor: 'birth', Header: '生日', Cell: row => new Date(row.row.original.birth).toLocaleDateString() },

            {
                accessor: 'action',
                Header: '操作',
                Cell: row => {
                    const { name, gender, id } = row.row.original
                    return (
                        <Box>
                            <Button
                                startIcon={<Edit color="contrast" />}
                                sx={{ fontSize: '1.1rem', color: 'contrast.main' }}
                                onClick={() => {
                                    dispatch(openDialog({ row: row.row.original, type: 'patient', mode: 'edit' }))
                                }}
                            >
                                編輯
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                sx={{ color: 'red.main', fontSize: '1.1rem' }}
                                onClick={() => {
                                    dispatch(
                                        openAlert({
                                            alertTitle: '確定刪除該病患?將會刪除所有相關資料',
                                            toastTitle: '刪除成功',
                                            text: `${name} ${gender === 'm' ? '先生' : '小姐'}`,
                                            icon: 'success',
                                            type: 'confirm',
                                            event: () => dispatch(deletePatient({ patientID: id })),
                                        })
                                    )
                                }}
                            >
                                刪除
                            </Button>
                        </Box>
                    )
                },
            },
            {
                accessor: 'createdAt',
                Header: '建立日期',
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
                accessor: 'schedule',
                Header: '排程狀態',
                Cell: row => {
                    // const hasReport = row.row.original.report.length > 0
                    const { id, name, gender } = row.row.original
                    const mr = gender === 'm' ? '先生' : '小姐'

                    const scheduleStatus = () => {
                        switch (row.row.original?.schedule?.status) {
                            case 'yet':
                                return { status: 'yet', class: 'yet', text: '等待排程', icon: <CalendarToday /> }
                            case 'wait-examination':
                                return { status: 'wait-examination', class: 'examination', text: '等待檢查', icon: <AccessTime /> }
                            case 'on-call':
                                return { status: 'on-call', class: 'call', text: '檢查中', icon: <AirlineSeatIndividualSuite /> }
                            case 'finish':
                                return { status: 'finish', class: 'finish', text: '完成報告', icon: <Check /> }
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
                                onClick={() => {
                                    switch (status.status) {
                                        case 'wait-examination':
                                            dispatch(
                                                openAlert({
                                                    alertTitle: `確定要取消 ${name} ${mr}的排程?`,
                                                    toastTitle: '取消排程',
                                                    text: `${name} ${mr}`,
                                                    type: 'confirm',
                                                    event: () => dispatch(removeSchedule(row.row.original?.schedule?._id)),
                                                })
                                            )

                                            break
                                        case 'yet':
                                            dispatch(
                                                openAlert({
                                                    alertTitle: `請輸入${name}的抽血編號`,
                                                    toastTitle: '加入排程',
                                                    text: `${name} ${mr}`,
                                                    type: 'input',
                                                    event: text =>
                                                        dispatch(addSchedule({ patientID: id, procedureCode: '19009C', blood: text })),
                                                    preConfirm: async text => {
                                                        // const { data: blood } = await apiCheckExists({ type: 'blood', value: text })
                                                        const { data: schedule } = await apiCheckExists({ type: 'schedule', value: id })
                                                        const regex = new RegExp('^[A-Za-z0-9]*$')
                                                        const isIllegal = !regex.test(text)
                                                        let warning = ''
                                                        // if (blood) warning += '此編號已被使用 '
                                                        if (schedule) warning += '此病人已在排程中'
                                                        if (isIllegal) warning += ' 含有非法字元'
                                                        return { exists: schedule || isIllegal, warning }
                                                    },
                                                })
                                            )

                                            break
                                        case 'on-call':
                                            dispatch(
                                                openAlert({
                                                    alertTitle: `確定要取消 ${name} ${mr}的檢查狀態(非管理員請勿操作)`,
                                                    toastTitle: '取消檢查狀態',
                                                    text: `${name} ${mr}`,
                                                    type: 'confirm',
                                                    event: () =>
                                                        dispatch(
                                                            changeScheduleStatus({
                                                                scheduleID: row.row.original?.schedule?._id,
                                                                status: 'wait-examination',
                                                            })
                                                        ),
                                                })
                                            )

                                            break
                                        default:
                                            break
                                    }
                                }}
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

    const fetchData = useCallback(params => dispatch(fetchPatients(params)), [])

    return (
        <Box className={classes.container}>
            <CustomTable
                columns={columns}
                fetchData={fetchData}
                data={data}
                loading={loading}
                totalPage={page}
                totalCount={count}
                GlobalFilter={GlobalFilter}
            />
        </Box>
    )
}

export default Patient
