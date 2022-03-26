import React, { useEffect, useMemo, useState } from 'react'
import { Box, Stepper, Step, StepLabel, IconButton, Chip } from '@mui/material'
import { ArrowBack, ArrowForward, EmojiEmotionsOutlined } from '@mui/icons-material'
import useStyles from './Style'

import { useDispatch, useSelector } from 'react-redux'

import CustomTable from '../../Components/CustomTable/CustomTable'
import CustomDataGrid from '../../Components/CustomDataGrid/CustomDataGrid'
import { AddCircle } from '@mui/icons-material'
import CustomForm from '../../Components/CustomForm/CustomForm'
import CustomReportForm from '../../Components/CustomReport/CustomReportForm'
import Gallbladder from './gallbladder.json'
import Kidney from './kidney.json'
import Liver from './liver.json'
import Pancreas from './pancreas.json'
import Spleen from './spleen.json'
import Suggestion from './suggestion.json'

const CreateReport = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [selection, setSelection] = useState([])
    const [patient, setPatient] = useState({})
    const steps = ['選擇病人', '新增報告', '完成']
    const classes = useStyles()
    const { data } = useSelector(state => state.patients)

    useEffect(() => {
        setPatient(data.find(d => d.id === selection[0]))
    }, [selection])

    // const columns = useMemo(
    //     () => [
    //         {
    //             accessor: 'process',
    //             Header: ' ',
    //             Cell: row => {
    //                 return (
    //                     <Box className={`${classes.status}`}>
    //                         <Box className={classes.statusBox}>排程中</Box>
    //                     </Box>
    //                 )
    //             },
    //         },
    //         { accessor: 'id', Header: '身分證字號' },
    //         { accessor: 'name', Header: '姓名' },
    //         { accessor: 'gender', Header: '性別' },
    //         { accessor: 'birth', Header: '生日' },
    //         { accessor: 'phone', Header: '電話' },
    //         { accessor: 'updateTime', Header: '更新日期' },
    //         {
    //             accessor: 'chose',
    //             Header: '新增',
    //             Cell: row => {
    //                 return (
    //                     <Box>
    //                         <IconButton onClick={() => setCurrentStep(s => (s += 1))}>
    //                             <AddCircle />
    //                         </IconButton>
    //                     </Box>
    //                 )
    //             },
    //         },
    //     ],
    //     []
    // )
    const columns = [
        {
            field: 'processing',
            headerName: '排程',
            renderCell: params => {
                return (
                    <Box className={classes.status}>
                        <Box className={classes.statusBox}>排程中</Box>
                    </Box>
                )
            },
        },
        { field: 'id', headerName: '身分證字號', flex: 1 },
        { field: 'name', headerName: '姓名', flex: 1 },
        { field: 'gender', headerName: '性別', flex: 1 },
        { field: 'birth', headerName: '生日', flex: 1 },
        { field: 'phone', headerName: '電話', flex: 1 },
        { field: 'updateTime', headerName: '更新時間', flex: 1 },
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
                <IconButton disabled={currentStep === 0} className={classes.button} onClick={() => setCurrentStep(p => p - 1)}>
                    <ArrowBack />
                </IconButton>

                <Box className={classes.tableContainer}>
                    {currentStep === 0 && (
                        <CustomDataGrid
                            data={data.filter(row => row.processing)}
                            columns={columns}
                            selection={selection}
                            setSelection={setSelection}
                        />
                    )}
                    {currentStep === 1 && (
                        <>
                            <Box className={classes.patientInfo}>
                                <Chip
                                    // icon={<EmojiEmotionsOutlined />}
                                    label={`${patient.id} / ${patient.name} / ${patient.gender}`}
                                    variant="outlined"
                                    className={classes.chip}
                                />
                            </Box>
                            <CustomReportForm lists={[Liver, Gallbladder, Kidney, Pancreas, Spleen, Suggestion]} patient={patient} />
                        </>
                    )}
                    {
                        currentStep === 2 && <Box><h1>完成</h1></Box>
                    }
                </Box>
                <IconButton
                    disabled={!patient||currentStep===2}
                    className={classes.button}
                    onClick={() => {
                        setCurrentStep(p => p + 1)
                    }}
                >
                    <ArrowForward />
                </IconButton>
            </Box>
        </Box>
    )
}

export default CreateReport
