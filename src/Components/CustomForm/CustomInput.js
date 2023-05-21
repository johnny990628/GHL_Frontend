import React, { useEffect, useState } from 'react'
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    MenuItem,
    Popover,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material'
import { useTheme } from '@mui/styles'
import { DayPicker } from 'react-day-picker'

import useStyles from './Style'

import { apiGetDepartments } from '../../Axios/Department'
import { zhTW } from 'date-fns/locale'
import { useSelector } from 'react-redux'
import { AccessTime } from '@mui/icons-material'

const CustomInput = ({ label, name, type, options, value, setValue, handleChange, handleHelperText, error, required }) => {
    const classes = useStyles()
    const theme = useTheme()

    const DatePicker = ({ label, value, setValue, error }) => {
        const [dateAnchorEl, setDateAnchorEl] = useState(null)
        const handleDateClick = event => {
            setDateAnchorEl(event.currentTarget)
        }
        const DatePickerPopover = () => {
            const handleClose = () => {
                setDateAnchorEl(null)
            }
            return (
                <Popover
                    open={Boolean(dateAnchorEl)}
                    anchorEl={dateAnchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <DayPicker
                        mode="single"
                        selected={value}
                        onDayClick={date => setValue(date)}
                        fromYear={1930}
                        toYear={new Date().getFullYear()}
                        captionLayout="dropdown"
                        locale={zhTW}
                    />
                </Popover>
            )
        }
        return (
            <>
                <TextField
                    variant="outlined"
                    required
                    className={classes.textField}
                    label={label}
                    value={new Date(value).toLocaleDateString()}
                    error={error}
                    InputProps={{
                        style: {
                            fontSize: '1.3rem',
                            color: theme.palette.primary.main,
                        },
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <AccessTime />
                            </InputAdornment>
                        ),
                    }}
                    InputLabelProps={{ style: { fontSize: '1.3rem', color: theme.palette.primary.main } }}
                    onClick={handleDateClick}
                />
                <DatePickerPopover />
            </>
        )
    }

    const CustomSelect = ({ value, setValue, options, error }) => {
        const handleSelectOnChange = e => {
            setValue(e.target.value)
        }

        return (
            <TextField
                variant="outlined"
                label="部門"
                select
                value={value}
                onChange={handleSelectOnChange}
                error={error}
                className={classes.textField}
                InputProps={{
                    style: {
                        fontSize: '1.3rem',
                        color: theme.palette.primary.main,
                    },
                }}
                InputLabelProps={{ style: { fontSize: '1.3rem', color: theme.palette.primary.main } }}
            >
                {options.length > 0 &&
                    options
                        .filter(department => department.active)
                        .map(department => (
                            <MenuItem
                                key={department._id}
                                value={department._id}
                                sx={{ fontSize: '1.3rem', color: theme.palette.primary.main }}
                            >
                                {department.name}
                            </MenuItem>
                        ))}
            </TextField>
        )
    }

    return type === 'date' ? (
        <DatePicker label={label} value={value} setValue={setValue} error={error} />
    ) : type === 'select' ? (
        <CustomSelect value={value} setValue={setValue} options={options} error={error} />
    ) : (
        <TextField
            variant="outlined"
            error={error}
            helperText={handleHelperText(name)}
            label={label}
            required={required}
            value={value}
            onChange={e => {
                setValue(e.target.value)
                handleChange(e.target.value, name)
            }}
            InputProps={{
                style: {
                    fontSize: '1.3rem',
                },
            }}
            InputLabelProps={{ style: { fontSize: '1.3rem' } }}
            FormHelperTextProps={{
                classes: {
                    root: classes.helperText,
                },
            }}
            className={classes.textField}
        />
    )
}

export default CustomInput
