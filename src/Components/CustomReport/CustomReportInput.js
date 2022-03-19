import React, { useEffect, useState } from 'react'
import { Box, TextField, FormControlLabel, Checkbox, Radio, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'
import useStyles from './Style'

const CustomReportInput = ({ row, isNormal, setIsNormal }) => {
    const classes = useStyles()
    const { label, type, options } = row
    const [checked, setChecked] = useState(false)
    const [radio, setRadio] = useState('')
    const [text, setText] = useState('')
    const [yam, setYam] = useState([])

    useEffect(() => {
        if (checked || text) setIsNormal(false)
        if (!checked) setYam([])
    }, [checked, text])
    useEffect(() => {
        if (isNormal) {
            setChecked(false)
            setRadio('')
        }
    }, [isNormal])

    const SelectLabel = () => {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {label.split('_').map((l, index) => (
                    <>
                        <Box className={classes.inputLabel}>{l}</Box>
                        {index + 1 === label.split('_').length || (
                            <Select
                                value={yam[index]}
                                onChange={e => {
                                    index === 0 && setYam(pre => [e.target.value, pre[1]])
                                    index === 1 && setYam(pre => [pre[0], e.target.value])
                                    setChecked(true)
                                }}
                            >
                                <MenuItem value={null} />
                                {Array(12)
                                    .fill()
                                    .map((_, index) => {
                                        return <MenuItem value={index + 1}>{index + 1}</MenuItem>
                                    })}
                            </Select>
                        )}
                    </>
                ))}
            </Box>
        )
    }

    return (
        <Box>
            {type === 'checkbox' && (
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
            {type === 'text' && (
                <TextField fullWidth label={label} variant="standard" value={text} onChange={e => setText(e.target.value)} />
            )}
            {type === 'select' && (
                <FormControlLabel control={<Checkbox checked={checked} onClick={() => setChecked(!checked)} />} label={<SelectLabel />} />
            )}
        </Box>
    )
}

export default CustomReportInput
