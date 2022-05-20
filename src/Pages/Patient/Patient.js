import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material'
import { CalendarToday, ArrowDropDown, Delete, Edit, Cancel } from '@mui/icons-material'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'
import CustomForm from '../../Components/CustomForm/CustomForm'
import EditDialog from '../../Components/CustomTable/EditDialog'

import { useDispatch, useSelector } from 'react-redux'
import { addProcessing, removeProcessing, deletePatient, createPatient, fetchPatients } from '../../Redux/Slices/Patient'
import { openDialog } from '../../Redux/Slices/Dialog'
import { openAlert } from '../../Redux/Slices/Alert'
import { apiAddSchedule, apiRemoveSchedule } from '../../Axios/Schedule'
import { apiCreateReport } from '../../Axios/Report'
import { apiAddBlood, apiRemoveBlood } from '../../Axios/Blood'
import axios from 'axios'
import { apiCheckPatientExists } from '../../Axios/Patient'

const Patient = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { data, count, page } = useSelector(state => state.patients)

    const columns = useMemo(
        () => [
            {
                accessor: row => {
                    return row.processing ? 1 : 0
                },
                Header: '排程',
                Cell: row => {
                    const { name, gender } = row.row.original

                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* <Box className={`${classes.status} ${processing && 'processing'}`}>
                                {processing ? (
                                    <Box className={classes.statusBox}>排程中</Box>
                                ) : (
                                    <Box className={classes.statusBox}>未排程</Box>
                                )}
                            </Box> */}

                            <IconButton
                                onClick={() => {
                                    const { id, name, gender } = row.row.original
                                    dispatch(
                                        openAlert({
                                            alertTitle: '請輸入抽血編號',
                                            toastTitle: '加入排程成功',
                                            text: `${name} ${gender === '男' ? '先生' : '小姐'}`,
                                            type: 'input',
                                            event: text => dispatch(addProcessing({ patientID: id, procedureCode: '19009C', blood: text })),
                                        })
                                    )
                                }}
                            >
                                <CalendarToday />
                            </IconButton>
                        </Box>
                    )
                },
            },
            // { accessor: 'blood', Header: '抽血編號' },
            { accessor: 'id', Header: '身分證字號' },
            { accessor: 'name', Header: '姓名' },
            { accessor: 'gender', Header: '性別' },
            // { accessor: 'birth', Header: '生日' },
            // { accessor: 'phone', Header: '電話' },
            // { accessor: 'department', Header: '部門單位' },
            // { accessor: 'address', Header: '地址' },
            {
                accessor: 'createdAt',
                Header: '建立日期',
                Cell: row => new Date(row.row.original.createdAt).toLocaleString(),
            },
            {
                accessor: 'action',
                Header: '操作',
                Cell: row => {
                    const { name, gender, blood, schedule, id } = row.row.original
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
                                            text: `${name} ${gender === '男' ? '先生' : '小姐'}`,
                                            icon: 'success',
                                            type: 'confirm',
                                            event: () =>
                                                dispatch(
                                                    deletePatient({
                                                        patientID: id,
                                                        blood: blood ? blood.number : null,
                                                        scheduleID: schedule.length > 0 ? schedule[0]._id : null,
                                                    })
                                                ),
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

    const sendData = useCallback(data => dispatch(createPatient(data), []))

    return (
        <Box className={classes.container}>
            <Accordion elevation={0} className={classes.accordion}>
                <AccordionSummary expandIcon={<ArrowDropDown />} sx={{ flexDirection: 'column-reverse' }} />
                <AccordionDetails>
                    <CustomForm title="新增病人" sendData={sendData} mode="create" />
                </AccordionDetails>
            </Accordion>

            <CustomTable columns={columns} fetchData={fetchData} data={data} totalPage={page} totalCount={count} />
            <EditDialog />
        </Box>
    )
}

export default Patient
