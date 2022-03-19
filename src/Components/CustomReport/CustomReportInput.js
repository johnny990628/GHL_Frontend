import React, { useEffect, useState } from 'react'
import { Box, FormControl, FormControlLabel, Checkbox, Radio } from '@mui/material'
import useStyles from './Style'

const CustomReportInput = ({ row, isNormal, setIsNormal }) => {
    const classes = useStyles()
    const { label, type, options } = row
    const [checked, setChecked] = useState(false)
    const [radio, setRadio] = useState('')

    useEffect(() => {
        if (checked) setIsNormal(false)
    }, [checked])
    useEffect(() => {
        if (isNormal) {
            setChecked(false)
            setRadio('')
        }
    }, [isNormal])
    return (
        <Box>
            {(type === 'checkbox' || type === 'text') && (
                <FormControlLabel
                    control={<Checkbox checked={checked} onClick={() => setChecked(!checked)} />}
                    label={<Box className={classes.inputLabel}>{label}</Box>}
                />
            )}
            {type === 'radio' && (
                <Box>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disabled={!radio}
                                checked={checked}
                                onClick={() => {
                                    setChecked(!checked)
                                    setRadio('')
                                }}
                            />
                        }
                        label={<Box className={classes.inputLabel}>{label}</Box>}
                    />
                    {options.map(option => (
                        <FormControlLabel
                            key={option.label}
                            value={option.value}
                            control={
                                <Radio
                                    checked={checked && radio === option.value}
                                    onClick={() => {
                                        setChecked(true)
                                        setRadio(option.value)
                                    }}
                                />
                            }
                            label={<Box className={classes.inputLabel}>{option.label}</Box>}
                        />
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default CustomReportInput
