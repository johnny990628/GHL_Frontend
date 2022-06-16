import React, { useState, useEffect } from 'react'
import { Box, Tabs, Tab, ToggleButton, useMediaQuery, Grid, Chip } from '@mui/material'
import { useTheme } from '@mui/styles'
import Scrollspy from 'react-scrollspy'

import useStyles from './Style'

import CustomReportInput from './CustomReportInput'
import CustomScrollbar from '../../Components/CustomScrollbar/CustomScrollbar'
import { useDispatch, useSelector } from 'react-redux'
import { clearCancer } from '../../Redux/Slices/ReportForm'
import ReportList from './ReportList'

const FormSection = ({ list, mode }) => {
    const classes = useStyles()
    const [isNormal, setIsNormal] = useState(true)

    const dispatch = useDispatch()
    const reportSection = useSelector(state => state.reportForm.edit[list.name])

    const handleNormalOnClick = () => {
        if (!isNormal) {
            setIsNormal(!isNormal)
            dispatch(clearCancer({ organ: list.name, mode }))
        }
    }

    useEffect(() => {
        if (reportSection) setIsNormal(reportSection.length === 0)
    }, [])

    return (
        <Box id={list.name} className={classes.formContainer}>
            <ToggleButton
                disableFocusRipple
                disableRipple
                color="primary"
                value="check"
                selected={isNormal}
                onClick={handleNormalOnClick}
                className={classes.toggleButton}
            >
                <Box className={classes.formLabel}>{list.label}</Box>
            </ToggleButton>

            <Box>
                {list.cols.map(row => (
                    <CustomReportInput
                        key={row.label}
                        row={row}
                        isNormal={isNormal}
                        setIsNormal={setIsNormal}
                        organ={list.name}
                        defaultValue={reportSection && reportSection.find(d => d.name === row.name)}
                        mode={mode}
                    />
                ))}
            </Box>
        </Box>
    )
}

const CustomReportForm = ({ lists, patient, mode }) => {
    const classes = useStyles()
    const theme = useTheme()
    const isComputer = useMediaQuery(theme.breakpoints.up('lg'))

    const [tabIndex, setTabIndex] = useState(0)

    return (
        <>
            {mode === 'create' && (
                <Box className={classes.patientInfo}>
                    <Chip label={`${patient.id} / ${patient.name} / ${patient.gender}`} variant="outlined" className={classes.chip} />
                </Box>
            )}

            <Box className={classes.container}>
                {isComputer && (
                    <Scrollspy items={lists.map(list => list.name)} className={classes.scrollspy}>
                        <Tabs value={tabIndex} orientation="vertical">
                            {lists.map((list, index) => (
                                <Tab
                                    key={list.name}
                                    label={list.label}
                                    disableRipple
                                    component="a"
                                    href={`#${list.name}`}
                                    className={classes.scrollspyButton}
                                    onClick={() => setTabIndex(index)}
                                />
                            ))}
                        </Tabs>
                    </Scrollspy>
                )}
                {mode === 'create' && (
                    <Grid container sx={{ height: '100%' }} spacing={2}>
                        <Grid item xs={9} lg={10}>
                            <CustomScrollbar>
                                {lists.map(list => (
                                    <FormSection key={list.name} list={list} mode={mode} />
                                ))}
                            </CustomScrollbar>
                        </Grid>
                        <Grid item xs={3} lg={2}>
                            {patient.reports.length > 0 && <ReportList patient={patient} />}
                        </Grid>
                    </Grid>
                )}
                {mode === 'edit' && (
                    <CustomScrollbar>
                        {lists.map(list => (
                            <FormSection key={list.name} list={list} mode={mode} />
                        ))}
                    </CustomScrollbar>
                )}
            </Box>
        </>
    )
}

export default CustomReportForm
