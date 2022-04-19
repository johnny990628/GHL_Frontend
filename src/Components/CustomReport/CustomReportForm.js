import React, { useState, useEffect } from 'react'
import { Box, Tabs, Tab, ToggleButton, useMediaQuery, Grid, Chip } from '@mui/material'
import { useTheme } from '@mui/styles'
import Scrollspy from 'react-scrollspy'

import useStyles from './Style'
import CustomReportInput from './CustomReportInput'
import CustomScrollbar from '../../Components/CustomScrollbar/CustomScrollbar'
import { useDispatch, useSelector } from 'react-redux'
import { clearCancer } from '../../Redux/Slices/Report'
import ReportList from './ReportList'

const FormSection = ({ list, defaultRow, mode }) => {
    const classes = useStyles()
    const [isNormal, setIsNormal] = useState(true)
    const dispatch = useDispatch()

    const handleNormalOnClick = () => {
        if (!isNormal) {
            setIsNormal(!isNormal)
            dispatch(clearCancer({ organ: list.name, mode }))
        }
    }
    useEffect(() => {
        if (defaultRow) setIsNormal(defaultRow.length === 0)
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
                {/* <FormControlLabel
                    control={<Checkbox checked={isNormal} onChange={handleNormalOnChange} />}
                    label={<Box className={classes.inputLabel}>正常</Box>}
                /> */}
            </ToggleButton>

            <Box>
                {list.cols.map(row => (
                    <CustomReportInput
                        key={row.name}
                        row={row}
                        isNormal={isNormal}
                        setIsNormal={setIsNormal}
                        organ={list.name}
                        defaultValue={defaultRow?.find(d => d.name === row.name)}
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
    const report = useSelector(state => state.report.edit)
    const [tabIndex, setTabIndex] = useState(0)
    const [currentReport, setCurrentReport] = useState({})

    useEffect(() => {
        console.log(report)
        setCurrentReport(report)
    }, [report])
    return (
        <>
            {mode === 'create' && (
                <Box className={classes.patientInfo}>
                    <Chip
                        // icon={<EmojiEmotionsOutlined />}
                        label={`${patient.id} / ${patient.name} / ${patient.gender}`}
                        variant="outlined"
                        className={classes.chip}
                    />
                </Box>
            )}

            <Box className={classes.container}>
                {isComputer && mode === 'create' && (
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
                            <FormSection key={list.name} list={list} defaultRow={currentReport[list.name]} mode={mode} />
                        ))}
                    </CustomScrollbar>
                )}
            </Box>
        </>
    )
}

export default CustomReportForm
