import React, { useEffect, useState } from 'react'
import {
    Box,
    TextField,
    FormControlLabel,
    Checkbox,
    Radio,
    Select,
    MenuItem,
    ToggleButton,
    RadioGroup,
    ToggleButtonGroup,
} from '@mui/material'
import { useTheme } from '@mui/styles'
import { useDispatch } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

import useStyles from './Style'
import { addCancer, removeCancer } from '../../Redux/Slices/ReportForm'

const CustomReportInput = ({ row, organ, input }) => {
    const classes = useStyles()
    const theme = useTheme()
    const { label, name, type, options } = row

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        input ? setText(input.value) : setText('')
    }, [input])

    //debounce the input while onchange
    const handleDispatch = useDebouncedCallback(value => {
        switch (type) {
            case 'checkbox':
                Boolean(value) ? dispatch(removeCancer({ organ, name })) : dispatch(addCancer({ organ, name, type, value: true }))
                break
            case 'radio':
                input?.value.includes(value) || Boolean(!value?.length)
                    ? dispatch(removeCancer({ organ, name }))
                    : dispatch(addCancer({ organ, name, type, value }))
                break
            case 'text':
                Boolean(value) ? dispatch(addCancer({ organ, name, type, value })) : dispatch(removeCancer({ organ, name }))
                break
            case 'text_size':
                Boolean(value) ? dispatch(addCancer({ organ, name, type, value })) : dispatch(removeCancer({ organ, name }))
                break
            case 'select':
                dispatch(addCancer({ organ, name, type, value }))
            default:
                break
        }
    }, 250)

    //處理資料變動
    const handleChange = (e, alignment) => {
        switch (type) {
            case 'checkbox':
                handleDispatch(input?.value)
                break
            case 'radio':
                handleDispatch(alignment)
                break
            case 'text':
                setText(e.target.value)
                handleDispatch(e.target.value)
                break
            case 'text_size':
                setText(e.target.value)
                handleDispatch(e.target.value)
                break
            case 'select':
                if (alignment === 0) {
                    handleDispatch([e.target.value, input?.value[1]])
                }
                if (alignment === 1) {
                    handleDispatch([input?.value[0], e.target.value])
                }
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
                            <Select value={input?.value[index]} defaultValue="" onChange={e => handleChange(e, index)}>
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
                    selected={input?.value}
                    onChange={handleChange}
                    className={classes.toggleButton}
                >
                    <Box className={`${classes.inputLabel} ${input?.value && 'select'}`}>{label}</Box>
                </ToggleButton>
            )}
            {type === 'radio' && (
                <Box>
                    <ToggleButton
                        color="primary"
                        value="check"
                        selected={input?.value.length > 0}
                        onChange={() => {
                            dispatch(removeCancer({ organ, name }))
                        }}
                        className={classes.toggleButton}
                        sx={{ color: input?.value && theme.palette.text.secondary }}
                    >
                        <Box className={`${classes.inputLabel} ${input?.value && 'select'}`}>{label}</Box>
                    </ToggleButton>

                    <ToggleButtonGroup value={input?.value} onChange={handleChange}>
                        {options.map(option => (
                            <ToggleButton
                                key={option.label}
                                value={option.value}
                                disableRipple
                                disableFocusRipple
                                disableElevation
                                className={classes.optionToggleButton}
                            >
                                {option.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>
            )}
            {type === 'text' && (
                <TextField
                    fullWidth
                    label={label}
                    variant="standard"
                    value={text}
                    onChange={handleChange}
                    sx={{ margin: ' 0 0 2rem 1.4rem' }}
                />
            )}
            {type === 'text_size' && (
                <TextField
                    fullWidth
                    label={label}
                    variant="standard"
                    value={text}
                    onChange={handleChange}
                    sx={{ margin: ' 0 0 2rem 1.4rem' }}
                />
            )}
            {type === 'select' && (
                <FormControlLabel
                    control={<Checkbox checked={input?.value.length > 0} onChange={() => dispatch(removeCancer({ organ, name }))} />}
                    label={<SelectLabel />}
                />
            )}
        </Box>
    )
}

export default CustomReportInput
