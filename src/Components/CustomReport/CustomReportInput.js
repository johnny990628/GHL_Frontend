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
import { addCancer, removeCancer } from '../../Redux/Slices/ReportForm'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

const CustomReportInput = ({ row, organ, isNormal, setIsNormal, defaultValue, mode }) => {
    const classes = useStyles()
    const theme = useTheme()
    const { label, name, type, options } = row
    const [checked, setChecked] = useState(false)
    const [radio, setRadio] = useState([])
    const [text, setText] = useState('')
    const [yam, setYam] = useState([])

    const dispatch = useDispatch()

    // 如果radio被取消，將checkbox設為false
    useEffect(() => {
        if (radio.length === 0) setChecked(false)
    }, [radio])

    // 如果有疾病被勾選，將器官正常設為false
    useEffect(() => {
        if (checked || text) setIsNormal(false)
        if (!checked) setYam([])
    }, [checked, text])

    // 如果正常被勾選，清空所有欄位
    useEffect(() => {
        if (isNormal && !defaultValue) {
            setChecked(false)
            setRadio('')
        }
    }, [isNormal])

    // 用於編輯頁面，將資料讀進state
    useEffect(() => {
        if (defaultValue) handleFillValue()
    }, [])

    // 用於編輯頁面，將資料填入
    const handleFillValue = () => {
        const { name, type, value } = defaultValue

        switch (type) {
            case 'checkbox':
                setChecked(value)
                break
            case 'radio':
                setChecked(true)
                setRadio(value)
                break
            case 'text':
                setText(value)
                break
            case 'select':
                setChecked(true)
                setYam([...value])
            default:
                break
        }
    }

    //debounce the input while onchange
    const handleDispatch = useDebouncedCallback(value => {
        switch (type) {
            case 'checkbox':
                dispatch(value ? removeCancer({ organ, name, mode }) : addCancer({ organ, name, type, value: true, mode }))
                break
            case 'radio':
                dispatch(value.length > 0 ? addCancer({ organ, name, type, value, mode }) : removeCancer({ organ, name, mode }))
                break
            case 'text':
                dispatch(addCancer({ organ, name, type, value, mode }))
                break
            case 'select':
                dispatch(addCancer({ organ, name, type, value, mode }))
            default:
                break
        }
    }, 500)

    //處理資料變動
    const handleChange = (e, value) => {
        switch (type) {
            case 'checkbox':
                setChecked(!checked)
                handleDispatch(checked)
                break
            case 'radio':
                setChecked(true)
                if (radio.includes(value)) {
                    setRadio(prev => prev.filter(p => p !== value))
                    handleDispatch(radio.filter(r => r !== value))
                } else {
                    setRadio(prev => [...prev, value])
                    handleDispatch([...radio, value])
                }
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
                                dispatch(removeCancer({ organ, name, mode }))
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
                            control={
                                <Radio checked={checked && radio.includes(option.value)} onClick={e => handleChange(e, option.value)} />
                            }
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
                                dispatch(removeCancer({ organ, name, mode }))
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
