import React, { useEffect, useMemo, useState } from 'react'
import { Box, Stepper, Step, StepLabel, IconButton, Button } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import useStyles from './Style'

import { useDispatch, useSelector } from 'react-redux'

import CustomTable from '../../Components/CustomTable/CustomTable'
import CustomDataGrid from '../../Components/CustomDataGrid/CustomDataGrid'
import { AddCircle } from '@mui/icons-material'
import CustomForm from '../../Components/CustomForm/CustomForm'

const CreateReport = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [selection, setSelection] = useState([])
    const [patient, setPatient] = useState({})
    const steps = ['選擇病人', '新增報告', '完成']
    const classes = useStyles()
    const { data } = useSelector(state => state.patients)

    useEffect(() => {
        setPatient(selection[0])
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
                {/* {currentStep === 0 && <CustomTable data={data.filter(row => row.processing)} columns={columns} />} */}
                <Box className={classes.tableContainer}>
                    {currentStep === 0 && (
                        <CustomDataGrid
                            data={data.filter(row => row.processing)}
                            columns={columns}
                            selection={selection}
                            setSelection={setSelection}
                        />
                    )}
                </Box>

                <IconButton
                    disabled={!patient}
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
