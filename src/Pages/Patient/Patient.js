import React, { useMemo } from 'react'
import { Box, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material'
import { CalendarToday, ArrowDropDown, Delete, Edit, Cancel } from '@mui/icons-material'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'
import CustomForm from '../../Components/CustomForm/CustomForm'
import EditDialog from '../../Components/CustomTable/EditDialog'

import { useDispatch, useSelector } from 'react-redux'
import { addProcessing, removeProcessing, deletePatient, createPatient } from '../../Redux/Slices/Patient'
import { openDialog } from '../../Redux/Slices/Dialog'
import { openAlert } from '../../Redux/Slices/Alert'

const Patient = () => {
    const classes = useStyles()
    // const { data, loading } = useSelector(state => state.patients)
    const { data } = useSelector(state => state.patients)
    const dispatch = useDispatch()

    const columns = useMemo(
        () => [
            {
                accessor: row => {
                    return row.processing ? 1 : 0
                },
                Header: '排程',
                Cell: row => {
                    const { processing, name, gender } = row.row.original

                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box className={`${classes.status} ${processing && 'processing'}`}>
                                {processing ? (
                                    <Box className={classes.statusBox}>排程中</Box>
                                ) : (
                                    <Box className={classes.statusBox}>未排程</Box>
                                )}
                            </Box>
                            {!processing ? (
                                <IconButton
                                    onClick={() => {
                                        dispatch(addProcessing({ patient: row.row.original }))
                                        dispatch(
                                            openAlert({
                                                title: '新增排程',
                                                text: `${name} ${gender === '男' ? '先生' : '小姐'}`,
                                                icon: 'success',
                                            })
                                        )
                                    }}
                                >
                                    <CalendarToday />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        dispatch(removeProcessing({ patient: row.row.original }))
                                        dispatch(
                                            openAlert({
                                                title: '取消排程',
                                                text: `${name} ${gender === '男' ? '先生' : '小姐'}`,
                                                icon: 'warning',
                                            })
                                        )
                                    }}
                                >
                                    <Cancel />
                                </IconButton>
                            )}
                        </Box>
                    )
                },
            },
            { accessor: 'blood', Header: '抽血編號' },
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
                                            title: '刪除成功',
                                            text: `${row.row.original.name} ${row.row.original.gender === '男' ? '先生' : '小姐'}`,
                                            icon: 'success',
                                            isConfirm: true,
                                            event: deletePatient({ id: row.row.original.id }),
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
    const handleSubmit = ({ id, blood, name, address, phone, department, birth, gender, age, processing, reports }) => {
        const formData = {
            id,
            blood,
            name,
            address,
            phone,
            department,
            birth,
            gender,
            age,
            processing,
            reports,
        }
        dispatch(createPatient({ patient: formData }))
        dispatch(openAlert({ title: '新增成功', icon: 'success' }))
    }

    return (
        <Box className={classes.container}>
            <Accordion elevation={0} className={classes.accordion}>
                <AccordionSummary expandIcon={<ArrowDropDown />} sx={{ flexDirection: 'column-reverse' }} />
                <AccordionDetails>
                    <CustomForm title="新增病人" handleSubmit={handleSubmit} mode="create" />
                </AccordionDetails>
            </Accordion>

            <CustomTable data={data} columns={columns} />
            <EditDialog />
        </Box>
    )
}

export default Patient
