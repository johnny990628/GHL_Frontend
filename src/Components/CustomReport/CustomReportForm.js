import React, { useState } from 'react'
import { Box, FormControlLabel, Checkbox, Tabs, Tab } from '@mui/material'
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
            <Box className={classes.formLabel}>{list.label}</Box>
            {list.name !== 'suggestion' && (
                <FormControlLabel
                    control={<Checkbox checked={isNormal} onChange={handleNormalOnChange} />}
                    label={<Box className={classes.inputLabel}>正常</Box>}
                />
            )}

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
    const [tabIndex, setTabIndex] = useState(0)
    return (
        <>
            <Box className={classes.container}>
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

                <CustomScrollbar>
                    {lists.map(list => (
                        <FormSection key={list.name} list={list} />
                    ))}
                </CustomScrollbar>
                {patient.reports.length > 0 && <ReportList patient={patient} />}
            </Box>
        </>
    )
}

export default CustomReportForm
