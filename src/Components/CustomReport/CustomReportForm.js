import React, { useState } from 'react'
import { Box, FormControlLabel, Checkbox, Tabs, Tab, ToggleButton, useMediaQuery, Grid } from '@mui/material'
import { useTheme } from '@mui/styles'
import Scrollspy from 'react-scrollspy'

import useStyles from './Style'
import CustomReportInput from './CustomReportInput'
import CustomScrollbar from '../../Components/CustomScrollbar/CustomScrollbar'
import { useDispatch } from 'react-redux'
import { clearCancer } from '../../Redux/Slices/Report'
import ReportList from './ReportList'

const FormSection = ({ list }) => {
    const classes = useStyles()
    const [isNormal, setIsNormal] = useState(true)
    const dispatch = useDispatch()
    const handleNormalOnChange = () => {
        setIsNormal(!isNormal)
        dispatch(clearCancer({ organ: list.name }))
    }

    return (
        <Box id={list.name} className={classes.formContainer}>
            <ToggleButton
                disableFocusRipple
                disableRipple
                color="primary"
                value="check"
                selected={isNormal}
                onChange={handleNormalOnChange}
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
                    <CustomReportInput key={row.name} row={row} isNormal={isNormal} setIsNormal={setIsNormal} organ={list.name} />
                ))}
            </Box>
        </Box>
    )
}

const CustomReportForm = ({ lists, patient }) => {
    const classes = useStyles()
    const theme = useTheme()
    const isComputer = useMediaQuery(theme.breakpoints.up('lg'))
    const [tabIndex, setTabIndex] = useState(0)
    return (
        <>
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
                <Grid container sx={{ height: '100%' }} spacing={2}>
                    <Grid item xs={9} lg={10}>
                        <CustomScrollbar>
                            {lists.map(list => (
                                <FormSection key={list.name} list={list} />
                            ))}
                        </CustomScrollbar>
                    </Grid>
                    <Grid item xs={3} lg={2}>
                        {patient.reports.length > 0 && <ReportList patient={patient} />}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default CustomReportForm
