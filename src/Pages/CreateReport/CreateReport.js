import React, { useEffect, useRef, useState } from 'react'
import { Box, Stepper, Step, StepLabel, IconButton, Button } from '@mui/material'
import { ArrowBack, ArrowForward, CheckCircleOutline, Cancel, Check, Close } from '@mui/icons-material'
import { useTheme } from '@mui/styles'
import useStyles from './Style'

import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import Lottie from 'lottie-react'

import CustomDataGrid from '../../Components/CustomDataGrid/CustomDataGrid'
import CustomReportForm from '../../Components/CustomReport/CustomReportForm'
import Gallbladder from '../../Assets/OrganJson/gallbladder.json'
import Kidney from '../../Assets/OrganJson/kidney.json'
import Liver from '../../Assets/OrganJson/liver.json'
import Pancreas from '../../Assets/OrganJson/pancreas.json'
import Spleen from '../../Assets/OrganJson/spleen.json'
import Suggestion from '../../Assets/OrganJson/suggestion.json'

import { createReport, resetReport } from '../../Redux/Slices/ReportForm'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import { fetchReportByReportID } from '../../Redux/Slices/Dialog'
import { openAlert } from '../../Redux/Slices/Alert'
import { fetchSchedule, removeSchedule } from '../../Redux/Slices/Schedule'
import success from '../../Assets/Animation/success.json'

const CreateReport = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [selection, setSelection] = useState([])
    const [selectTrigger, setSelectTrigger] = useState(false)
    const [patient, setPatient] = useState({})
    const [reportDialogMode, setReportDialogMode] = useState('create')

    const { schedules, patients, count } = useSelector(state => state.schedule)
    const { user } = useSelector(state => state.auth)
    const report = useSelector(state => state.reportForm.create)

    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme()

    useEffect(() => {
        if (selection.length > 0) {
            const { patient, reportID, reports } = schedules.find(s => s.patientID === selection[0])
            setPatient({ ...patient, reportID, reports })
            if (!selectTrigger) setCurrentStep(1)
            setSelectTrigger(false)
        }
    }, [selection])

    useEffect(() => {
        if (currentStep === 0) {
            setReportDialogMode('create')
            dispatch(fetchSchedule())
            dispatch(resetReport({ mode: 'create' }))
        }
        if (currentStep === 2) {
            setReportDialogMode('edit')
            handleReportSubmit()
        }
    }, [currentStep])

    useEffect(() => {
        return () => dispatch(resetReport({ mode: 'create' }))
    }, [])

    const handleReportSubmit = () => {
        dispatch(
            createReport({
                patientID: patient.id,
                reportID: patient.reportID,
                data: { report: { ...report, id: v4() }, userID: user._id, status: 'finished' },
            })
        )
    }

    const columns = [
        {
            field: 'processing',
            headerName: '取消排程',
            renderCell: params => {
                return (
                    <IconButton
                        onClick={() => {
                            const { id, name, gender } = params.row
                            setSelectTrigger(true)
                            const mr = gender === 'm' ? '先生' : '小姐'
                            dispatch(
                                openAlert({
                                    alertTitle: `確定要取消 ${name} ${mr}的排程?`,
                                    toastTitle: '取消排程',
                                    text: `${name} ${mr}`,
                                    type: 'confirm',
                                    event: () => dispatch(removeSchedule(id)),
                                })
                            )
                        }}
                    >
                        <Cancel />
                    </IconButton>
                )
            },
        },
        { field: 'id', headerName: '身分證字號', flex: 2 },
        { field: 'blood', headerName: '抽血編號', flex: 1 },
        { field: 'name', headerName: '姓名', flex: 1 },
        {
            field: 'gender',
            headerName: '性別',
            flex: 1,
            renderCell: params => {
                return <div>{params.row.gender === 'm' ? '男' : '女'}</div>
            },
        },
        {
            field: 'birth',
            headerName: '生日',
            flex: 1,
            renderCell: params => {
                return <Box>{new Date(params.row.birth).toLocaleDateString()}</Box>
            },
        },
        { field: 'phone', headerName: '電話', flex: 1 },
    ]

    const FinishSection = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <Lottie style={{ width: '60vw', height: '50vh' }} animationData={success} loop={true} />

                <Box sx={{ fontSize: '3rem' }}>報告已成功儲存</Box>
                <Box sx={{ fontSize: '2rem' }}>檢查者:{patient.name}</Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button
                        variant="contained"
                        sx={{
                            background: theme.palette.contrast.main,
                            '&:hover': {
                                backgroundColor: theme.palette.contrast.dark,
                            },
                        }}
                        className={classes.button}
                        onClick={() => dispatch(fetchReportByReportID(patient.reportID))}
                    >
                        預覽
                    </Button>

                    <Button variant="contained" className={classes.button} onClick={() => setCurrentStep(0)}>
                        返回
                    </Button>
                </Box>
            </Box>
        )
    }

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box className={classes.container}>
                <Box className={classes.tableContainer}>
                    {currentStep === 0 && (
                        <CustomDataGrid data={patients} columns={columns} selection={selection} setSelection={setSelection} />
                    )}
                    {currentStep === 1 && (
                        <>
                            <CustomReportForm
                                lists={[Liver, Gallbladder, Kidney, Pancreas, Spleen, Suggestion]}
                                patient={patient}
                                mode="create"
                            />
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<Check />}
                                    sx={{ borderRadius: '2rem', height: 'auto', marginRight: '1rem' }}
                                    onClick={() => setCurrentStep(2)}
                                >
                                    完成報告
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Close />}
                                    sx={{ borderRadius: '2rem', height: 'auto' }}
                                    onClick={() => setCurrentStep(0)}
                                >
                                    取消
                                </Button>
                            </Box>
                        </>
                    )}
                    {currentStep === 2 && <FinishSection />}
                </Box>
            </Box>
            <ReportDialog mode={reportDialogMode} />
        </Box>
    )
}

export default CreateReport
