import React, { useEffect, useState } from 'react'
import {
    Box,
    TextField,
    FormControlLabel,
    Checkbox,
    Radio,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    ToggleButton,
} from '@mui/material'
import { useTheme } from '@mui/styles'
import useStyles from './Style'
import { addCancer, removeCancer } from '../../Redux/Slices/Report'
import { useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

const CustomReportInput = ({ row, organ, isNormal, setIsNormal }) => {
    const classes = useStyles()
    const theme = useTheme()
    const { label, name, type, options } = row
    const [checked, setChecked] = useState(false)
    const [radio, setRadio] = useState('')
    const [text, setText] = useState('')
    const [yam, setYam] = useState([])

    const dispatch = useDispatch()

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

    //debounce the input while onchange
    const handleDispatch = useDebouncedCallback(value => {
        switch (type) {
            case 'checkbox':
                dispatch(value ? removeCancer({ organ, name }) : addCancer({ organ, name, type, value: true }))
                break
            case 'radio':
                dispatch(addCancer({ organ, name, type, value }))
                break
            case 'text':
                dispatch(addCancer({ organ, name, type, value }))
                break
            case 'select':
                dispatch(addCancer({ organ, name, type, value }))
            default:
                break
        }
    }, 500)

    const handleChange = (e, value) => {
        switch (type) {
            case 'checkbox':
                setChecked(!checked)
                handleDispatch(checked)
                break
            case 'radio':
                setChecked(true)
                setRadio(value)
                handleDispatch(value)
                break
            case 'text':
                setText(e.target.value)
                handleDispatch(e.target.value)
                break
            case 'select':
                if (value === 0) {
                    setYam(pre => [e.target.value, pre[1]])
                    handleDispatch([e.target.value, yam[1]])
                }
                if (value === 1) {
                    setYam(pre => [pre[0], e.target.value])
                    handleDispatch([yam[0], e.target.value])
                }
                setChecked(true)

            default:
                break
        }
    }

    const SelectLabel = () => {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', color: theme.palette.text.secondary }}>
                {label.split('_').map((l, index) => (
                    <Box key={l} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box className={classes.inputLabel}>{l}</Box>
                        {index + 1 === label.split('_').length || (
                            <Select value={yam[index]} defaultValue="" onChange={e => handleChange(e, index)}>
                                {Array(12)
                                    .fill()
                                    .map((_, index) => {
                                        return (
                                            <MenuItem key={index} value={index + 1}>
                                                {index + 1}
                                            </MenuItem>
                                        )
                                    })}
                            </Select>
                        )}
                    </Box>
                ))}
            </Box>
        )
    }

    return (
        <Box>
            {type === 'checkbox' && (
                <ToggleButton
                    color="primary"
                    value="check"
                    selected={checked}
                    onChange={handleChange}
                    className={classes.toggleButton}
                    sx={{ color: checked && theme.palette.text.secondary }}
                >
                    <Box className={classes.inputLabel}>{label}</Box>
                    {/* <FormControlLabel
                    control={<Checkbox checked={checked} onClick={handleChange} />}
                    label={<Box className={classes.inputLabel}>{label}</Box>}
                /> */}
                </ToggleButton>
            )}
            {type === 'radio' && (
                <Box>
                    <ToggleButton
                        color="primary"
                        value="check"
                        selected={checked}
                        onClick={() => {
                            if (radio) {
                                setChecked(!checked)
                                setRadio('')
                                dispatch(removeCancer({ organ, name }))
                            }
                        }}
                        className={classes.toggleButton}
                        sx={{ color: checked && theme.palette.text.secondary }}
                    >
                        <Box className={classes.inputLabel}>{label}</Box>
                    </ToggleButton>
                    {/* <FormControlLabel
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
                    /> */}
                    {options.map(option => (
                        <FormControlLabel
                            key={option.label}
                            value={option.value}
                            control={<Radio checked={checked && radio === option.value} onClick={e => handleChange(e, option.value)} />}
                            label={<Box className={classes.inputLabel}>{option.label}</Box>}
                        />
                    ))}
                </Box>
            )}
            {type === 'text' && <TextField fullWidth label={label} variant="standard" value={text} onChange={handleChange} />}
            {type === 'select' && (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onClick={() => {
                                setChecked(!checked)
                                dispatch(removeCancer({ organ, name }))
                            }}
                        />
                    }
                    label={<SelectLabel />}
                />
            )}
        </Box>
    )
}

export default CustomReportInput
