import React, { useState } from 'react'
import { Box, FormControl, FormControlLabel, Checkbox, Radio } from '@mui/material'
import useStyles from './Style'

const CustomReportInput = ({ row }) => {
    const classes = useStyles()
    const { label, type, options } = row
    return (
        <Box>
            {type === 'checkbox' && (
                <FormControlLabel control={<Checkbox defaultChecked />} label={<Box className={classes.inputLabel}>{label}</Box>} />
            )}
            {type === 'radio' && (
                <Box>
                    <FormControlLabel control={<Checkbox defaultChecked />} label={<Box className={classes.inputLabel}>{label}</Box>} />
                    {options.map(option => (
                        <FormControlLabel
                            value={option.value}
                            control={<Radio />}
                            label={<Box className={classes.inputLabel}>{option.label}</Box>}
                        />
                    ))}
                </Box>
            )}
            {type === 'text' && (
                <FormControlLabel control={<Checkbox defaultChecked />} label={<Box className={classes.inputLabel}>{label}</Box>} />
            )}
        </Box>
    )
}

export default CustomReportInput
