import React, { useCallback, useMemo } from 'react'
import {
    Box,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress,
} from '@mui/material'
import { CalendarToday, ArrowDropDown, Delete, Edit, Cancel, Check, DesignServices, AccessTime } from '@mui/icons-material'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'
import CustomForm from '../../Components/CustomForm/CustomForm'
import EditDialog from './EditDialog'
import GlobalFilter from '../../Components/GlobalFilter/GlobalFilter'

import { useDispatch, useSelector } from 'react-redux'
import { deletePatient, createPatient, fetchPatients, patientTrigger } from '../../Redux/Slices/Patient'
import { openDialog } from '../../Redux/Slices/Dialog'
import { openAlert } from '../../Redux/Slices/Alert'
import { apiCheckExists } from '../../Axios/Exists'
import { addSchedule, changeScheduleStatus, removeSchedule, updateSchedule } from '../../Redux/Slices/Schedule'

const Patient = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { data, count, page, loading } = useSelector(state => state.patients)

    const columns = useMemo(
        () => [
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
                                return { status: 'yet', class: 'yet', text: '等待排程' }
                            case 'wait-blood':
                                return { status: 'wait-blood', class: 'blood', text: '等待抽血' }
                            case 'wait-examination':
                                return { status: 'wait-examination', class: 'examination', text: '完成抽血' }
                            case 'on-call':
                                return { status: 'on-call', class: 'call', text: '檢查中' }
                            case 'finish':
                                return { status: 'finish', class: 'finish', text: '完成報告' }
                            default:
                                return { status: 'yet', class: 'yet', text: '等待排程' }
                        }
                    }
                    const status = scheduleStatus()

                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {(status.status === 'wait-blood' || status.status === 'wait-examination') && (
                                <IconButton
                                    onClick={() => {
                                        dispatch(
                                            openAlert({
                                                alertTitle: `確定要取消 ${name} ${mr}的排程?`,
                                                toastTitle: '取消排程',
                                                text: `${name} ${mr}`,
                                                type: 'confirm',
                                                event: () => dispatch(removeSchedule(id)).then(() => dispatch(patientTrigger())),
                                            })
                                        )
                                    }}
                                >
                                    <Cancel />
                                </IconButton>
                            )}
                            {status.status === 'yet' && (
                                <IconButton
                                    onClick={() => {
                                        dispatch(
                                            openAlert({
                                                alertTitle: `請輸入${name}的抽血編號`,
                                                toastTitle: '加入排程',
                                                text: `${name} ${mr}`,
                                                type: 'input',
                                                event: text =>
                                                    dispatch(addSchedule({ patientID: id, procedureCode: '19009C', blood: text })).then(
                                                        () => dispatch(patientTrigger())
                                                    ),
                                                preConfirm: async text => {
                                                    const { data: blood } = await apiCheckExists({ type: 'blood', value: text })
                                                    const { data: schedule } = await apiCheckExists({ type: 'schedule', value: id })
                                                    const regex = new RegExp('^[A-Za-z0-9]*$')
                                                    const isIllegal = !regex.test(text)
                                                    let warning = ''
                                                    if (blood) warning += '此編號已被使用 '
                                                    if (schedule) warning += '此病人已在排程中'
                                                    if (isIllegal) warning += ' 含有非法字元'
                                                    return { exists: blood || schedule || isIllegal, warning }
                                                },
                                            })
                                        )
                                    }}
                                >
                                    <CalendarToday />
                                </IconButton>
                            )}
                            {status.status === 'on-call' && (
                                <IconButton
                                    onClick={() =>
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
                                                    ).then(() => dispatch(patientTrigger())),
                                            })
                                        )
                                    }
                                >
                                    <AccessTime />
                                </IconButton>
                            )}
                            {status.status === 'finish' && (
                                <IconButton>
                                    <Check />
                                </IconButton>
                            )}
                            <Box className={`${classes.status} ${status.class} `}>
                                <Box className={classes.statusBox}>{status.text}</Box>
                            </Box>
                        </Box>
                    )
                },
            },
            {
                accessor: 'blood',
                Header: '抽血編號',
                Cell: row => {
                    const text = row.row.original?.blood?.number ? row.row.original.blood.number : '無'
                    const status = row.row.original?.schedule?.status ? row.row.original.schedule.status : 'yet'
                    return (
                        <>
                            {status === 'yet' && '無'}
                            {status === 'wait-blood' && (
                                <Button
                                    variant="outlined"
                                    startIcon={<DesignServices size={18} />}
                                    onClick={() =>
                                        dispatch(
                                            updateSchedule({
                                                scheduleID: row.row.original.schedule._id,
                                                data: { status: 'wait-examination' },
                                            })
                                        ).then(() => dispatch(patientTrigger()))
                                    }
                                >
                                    {text}
                                </Button>
                            )}
                            {status === 'wait-examination' && (
                                <Button
                                    variant="outlined"
                                    startIcon={<Check />}
                                    onClick={() =>
                                        dispatch(
                                            updateSchedule({
                                                scheduleID: row.row.original.schedule._id,
                                                data: { status: 'wait-blood' },
                                            })
                                        ).then(() => dispatch(patientTrigger()))
                                    }
                                >
                                    {text}
                                </Button>
                            )}
                            {status === 'on-call' && (
                                <Button variant="outlined" startIcon={<Check />}>
                                    {text}
                                </Button>
                            )}
                            {status === 'finish' && '已完成'}
                        </>
                    )
                },
            },
            { accessor: 'name', Header: '姓名' },
            { accessor: 'id', Header: '身分證字號' },
            { accessor: 'birth', Header: '生日', Cell: row => new Date(row.row.original.birth).toLocaleDateString() },
            {
                accessor: 'creator',
                Header: '建立者',
                Cell: row => (row.row.original?.creator?.name ? row.row.original.creator.name : '無'),
            },
            // { accessor: 'gender', Header: '性別', Cell: row => (row.row.original.gender === 'm' ? '男' : '女') },
            // {
            //     accessor: 'department',
            //     Header: '部門',
            //     Cell: row =>
            //         row.row.original.department.length > 6 ? row.row.original.department.slice(0, 6) + '...' : row.row.original.department,
            // },
            {
                accessor: 'createdAt',
                Header: '建立日期',
                Cell: row => new Date(row.row.original.createdAt).toLocaleString(),
            },
            {
                accessor: 'action',
                Header: '操作',
                Cell: row => {
                    const { name, gender, id } = row.row.original
                    return (
                        <Box>
                            <IconButton
                                onClick={() => {
                                    dispatch(openDialog({ row: row.row.original, type: 'patient' }))
                                }}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
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
                                <Delete />
                            </IconButton>
                        </Box>
                    )
                },
            },
        ],
        []
    )

    const fetchData = useCallback(params => dispatch(fetchPatients(params)), [])

    const sendData = useCallback(data => dispatch(createPatient(data)), [])

    const StatusRadioGroup = ({ status, setStatus }) => {
        const handleOnChange = e => setStatus(e.target.value)
        return (
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">狀態</FormLabel>
                <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={status} onChange={handleOnChange}>
                    <FormControlLabel value="all" control={<Radio />} label="全部" />
                    <FormControlLabel value="wait-blood" control={<Radio />} label="等待抽血" />
                    <FormControlLabel value="wait-examination" control={<Radio />} label="完成抽血" />
                    <FormControlLabel value="finish" control={<Radio />} label="完成報告" />
                </RadioGroup>
            </FormControl>
        )
    }

    return (
        <Box className={classes.container}>
            <Accordion elevation={0} className={classes.accordion}>
                <AccordionSummary expandIcon={<ArrowDropDown />} sx={{ flexDirection: 'column-reverse' }} />
                <AccordionDetails>
                    <CustomForm title="新增病人" sendData={sendData} mode="create" />
                </AccordionDetails>
            </Accordion>

            <CustomTable
                columns={columns}
                fetchData={fetchData}
                data={data}
                loading={loading}
                totalPage={page}
                totalCount={count}
                StatusRadioGroup={StatusRadioGroup}
                GlobalFilter={GlobalFilter}
            />
            <EditDialog />
        </Box>
    )
}

export default Patient
