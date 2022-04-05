import React, { useMemo } from 'react'
import { Box, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material'
import { CalendarToday, ArrowDropDown, Delete, Edit, Cancel } from '@mui/icons-material'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'
import CustomForm from '../../Components/CustomForm/CustomForm'
import EditDialog from '../../Components/CustomTable/EditDialog'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPatients, addPatient, removePatient, addProcessing, removeProcessing } from '../../Redux/Slices/Patient'
import { openDialog } from '../../Redux/Slices/Dialog'
import { openSnackbar } from '../../Redux/Slices/Snackbar'

const Patient = () => {
    const classes = useStyles()
    // const { data, loading } = useSelector(state => state.patients)
    const { data } = useSelector(state => state.patients)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(fetchPatients());
    // }, []);

    const columns = useMemo(
        () => [
            {
                accessor: row => {
                    return row.processing ? 1 : 0
                },
                Header: '排程',
                Cell: row => {
                    const { processing } = row.row.original

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
                                        dispatch(openSnackbar('新增排程'))
                                    }}
                                >
                                    <CalendarToday />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        dispatch(removeProcessing({ patient: row.row.original }))
                                        dispatch(openSnackbar('取消排程'))
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
            { accessor: 'updateTime', Header: '更新日期' },
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
                                    dispatch(removePatient({ id: row.row.original.id }))
                                    dispatch(openSnackbar('刪除成功'))
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
            birth: `${birth.year}/${birth.month}/${birth.day}`,
            gender,
            age,
            updateTime: new Date().toLocaleString(),
            processing,
            reports,
        }
        dispatch(addPatient({ patient: formData }))
        dispatch(openSnackbar('新增成功'))
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
