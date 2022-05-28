import React, { useEffect, useMemo, useState } from 'react'
import { Box, Stepper, Step, StepLabel, IconButton, Button } from '@mui/material'
import { ArrowBack, ArrowForward, CheckCircleOutline, Cancel } from '@mui/icons-material'
import { useTheme } from '@mui/styles'
import useStyles from './Style'

import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

import CustomDataGrid from '../../Components/CustomDataGrid/CustomDataGrid'
import CustomReportForm from '../../Components/CustomReport/CustomReportForm'
import Gallbladder from '../../Assets/OrganJson/gallbladder.json'
import Kidney from '../../Assets/OrganJson/kidney.json'
import Liver from '../../Assets/OrganJson/liver.json'
import Pancreas from '../../Assets/OrganJson/pancreas.json'
import Spleen from '../../Assets/OrganJson/spleen.json'
import Suggestion from '../../Assets/OrganJson/suggestion.json'

import { createReport, resetReport } from '../../Redux/Slices/Report'
import ReportDialog from '../../Components/ReportDialog/ReportDialog'
import { fetchReport, openDialog } from '../../Redux/Slices/Dialog'
import { apiDeleteScheduleAndBloodAndReport, apiGetSchdules } from '../../Axios/Schedule'
import { openAlert } from '../../Redux/Slices/Alert'

const CreateReport = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [selection, setSelection] = useState([])
    const [schedules, setSchedules] = useState([])
    const [patient, setPatient] = useState({})
    const steps = ['選擇病人', '新增報告', '完成']
    const report = useSelector(state => state.report.create)

    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme()

    useEffect(() => {
        if (selection.length > 0) {
            const { patient, reportID, reports } = schedules.find(s => s.patientID === selection[0])
            setPatient({ ...patient, reportID, reports })
        }
    }, [selection])

    useEffect(() => {
        if (currentStep === 0) {
            getSchedulesThenSetState()
        }
        if (currentStep === 2) {
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
                data: { report: { ...report, id: v4() }, status: 'finished' },
            })
        )
    }

    const getSchedulesThenSetState = () => apiGetSchdules({ procedureCode: '19009C' }).then(res => setSchedules(res.data.results))

    const columns = [
        {
            field: 'processing',
            headerName: '取消排程',
            renderCell: params => {
                return (
                    <IconButton
                        onClick={() => {
                            const { id, name, gender } = params.row
                            dispatch(
                                openAlert({
                                    alertTitle: `確定要取消 ${name} ${gender === '男' ? '先生' : '小姐'}的排程?`,
                                    toastTitle: '加入排程成功',
                                    text: `${name} ${gender === '男' ? '先生' : '小姐'}`,
                                    type: 'confirm',
                                    event: () => apiDeleteScheduleAndBloodAndReport(id).then(getSchedulesThenSetState),
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
        { field: 'name', headerName: '姓名', flex: 1 },
        { field: 'gender', headerName: '性別', flex: 1 },
        {
            field: 'birth',
            headerName: '生日',
            flex: 1,
            renderCell: params => {
                return <Box>{new Date(params.row.birth).toLocaleDateString()}</Box>
            },
        },
        { field: 'phone', headerName: '電話', flex: 1 },
        // {
        //     field: 'updateTime',
        //     headerName: '排程時間',
        //     flex: 1,
        //     renderCell: params => {
        //         return <Box>{new Date(params.row.createdAt).toLocaleTimeString()}</Box>
        //     },
        // },
    ]

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Stepper activeStep={currentStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel classes={{ label: classes.stepLabel }}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box className={classes.container}>
                <IconButton
                    sx={{ display: (currentStep === 0 || currentStep === 2) && 'none' }}
                    className={classes.button}
                    onClick={() => setCurrentStep(p => p - 1)}
                >
                    <ArrowBack />
                </IconButton>

                <Box className={classes.tableContainer}>
                    {currentStep === 0 && (
                        <CustomDataGrid
                            data={schedules.map(s => s.patient)}
                            columns={columns}
                            selection={selection}
                            setSelection={setSelection}
                        />
                    )}
                    {currentStep === 1 && (
                        <CustomReportForm
                            lists={[Liver, Gallbladder, Kidney, Pancreas, Spleen, Suggestion]}
                            patient={patient}
                            mode="create"
                        />
                    )}
                    {currentStep === 2 && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <CheckCircleOutline sx={{ fontSize: '10rem', color: theme.palette.contrast.main }} />

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
                                    onClick={() => dispatch(fetchReport(patient.reportID))}
                                >
                                    預覽
                                </Button>

                                <Button variant="contained" className={classes.button} onClick={() => setCurrentStep(0)}>
                                    返回
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
                <IconButton
                    sx={{ display: currentStep === 2 && 'none' }}
                    disabled={!patient}
                    className={classes.button}
                    onClick={() => {
                        setCurrentStep(p => p + 1)
                    }}
                >
                    <ArrowForward />
                </IconButton>
            </Box>
            <ReportDialog mode="create" />
        </Box>
    )
}

export default CreateReport
