import React, { useCallback, useMemo } from 'react'
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'
import { CalendarToday, ArrowDropDown, Delete, Edit, Cancel } from '@mui/icons-material'

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
import { addSchedule, removeSchedule } from '../../Redux/Slices/Schedule'

const Patient = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { data, count, page, loading } = useSelector(state => state.patients)

    const columns = useMemo(
        () => [
            {
                accessor: row => {
                    return row.schedule.length > 0 ? 1 : 0
                },
                Header: '排程狀態',
                Cell: row => {
                    const hasSchedule = row.row.original.schedule.length > 0
                    const hasReport = row.row.original.report.length > 0
                    const { id, name, gender } = row.row.original
                    const mr = gender === 'm' ? '先生' : '小姐'
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {hasSchedule ? (
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
                            ) : (
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

                            <Box className={`${classes.status} ${hasSchedule ? 'processing' : hasReport ? 'finish' : ''} `}>
                                <Box className={classes.statusBox}>{hasSchedule ? '排程中' : hasReport ? '已完成' : '未排程'}</Box>
                            </Box>
                        </Box>
                    )
                },
            },

            { accessor: 'id', Header: '身分證字號' },
            { accessor: 'name', Header: '姓名' },
            { accessor: 'gender', Header: '性別', Cell: row => (row.row.original.gender === 'm' ? '男' : '女') },
            {
                accessor: 'department',
                Header: '部門',
                Cell: row =>
                    row.row.original.department.length > 6 ? row.row.original.department.slice(0, 6) + '...' : row.row.original.department,
            },
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
                    <FormControlLabel value="yet" control={<Radio />} label="未排程" />
                    <FormControlLabel value="processing" control={<Radio />} label="排程中" />
                    <FormControlLabel value="finish" control={<Radio />} label="已完成" />
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
