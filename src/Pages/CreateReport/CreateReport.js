import React, { useMemo, useState } from 'react'
import { Box, Stepper, Step, StepLabel, IconButton, Button } from '@mui/material'
import useStyles from './Style'

import { useDispatch, useSelector } from 'react-redux'

import CustomTable from '../../Components/CustomTable/CustomTable'
import { AddCircle } from '@mui/icons-material'

const CreateReport = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const steps = ['選擇病人', '新增報告', '完成']
    const classes = useStyles()
    const { data } = useSelector(state => state.patients)

    const columns = useMemo(
        () => [
            {
                accessor: 'process',
                Header: ' ',
                Cell: row => {
                    return (
                        <Box className={`${classes.status}`}>
                            <Box className={classes.statusBox}>排程中</Box>
                        </Box>
                    )
                },
            },
            { accessor: 'id', Header: '身分證字號' },
            { accessor: 'name', Header: '姓名' },
            { accessor: 'gender', Header: '性別' },
            { accessor: 'birth', Header: '生日' },
            { accessor: 'phone', Header: '電話' },
            { accessor: 'updateTime', Header: '更新日期' },
            {
                accessor: 'chose',
                Header: '新增',
                Cell: row => {
                    return (
                        <Box>
                            <IconButton onClick={() => setCurrentStep(s => (s += 1))}>
                                <AddCircle />
                            </IconButton>
                        </Box>
                    )
                },
            },
        ],
        []
    )

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
                {currentStep === 0 && <CustomTable data={data.filter(row => row.processing)} columns={columns} />}
            </Box>
        </Box>
    )
}

export default CreateReport
