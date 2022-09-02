import React, { useEffect, useState } from 'react'
import { Box, FormControl, FormControlLabel, FormLabel, MenuItem, Popover, Radio, RadioGroup, TextField } from '@mui/material'
import { useTheme } from '@mui/styles'
import { DayPicker } from 'react-day-picker'

import useStyles from './Style'

import { apiGetDepartments } from '../../Axios/Department'
import { zhTW } from 'date-fns/locale'

const CustomInput = ({ label, name, value, setValue, handleChange, handleHelperText, error, mode, required }) => {
    const classes = useStyles()
    const theme = useTheme()

    const DatePickerCustomInput = ({ value, setValue, error }) => {
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
                    variant="standard"
                    className={classes.textField}
                    label="生日"
                    required
                    value={new Date(value).toLocaleDateString()}
                    InputProps={{
                        style: {
                            fontSize: '1.3rem',
                            color: theme.palette.primary.main,
                        },
                        readOnly: true,
                    }}
                    InputLabelProps={{ style: { fontSize: '1.3rem', color: theme.palette.primary.main } }}
                    onClick={handleDateClick}
                />
                <DatePickerPopover />
                <Box className={classes.textField} />
            </>
        )
    }

    const GenderPicker = () => {
        return (
            <>
                <FormControl className={classes.textField}>
                    <FormLabel id="genderPicker" sx={{ fontSize: '1.5rem' }}>
                        性別
                    </FormLabel>
                    <RadioGroup row aria-labelledby="genderPicker" value={value} onChange={e => setValue(e.target.value)}>
                        <FormControlLabel value="男" control={<Radio />} label={<Box className={classes.labelText}>男</Box>} />
                        <FormControlLabel value="女" control={<Radio />} label={<Box className={classes.labelText}>女</Box>} />
                    </RadioGroup>
                </FormControl>
                <Box className={classes.textField} />
            </>
        )
    }

    const Department = ({ value, setValue, error }) => {
        const [departments, setDepartments] = useState([])

        useEffect(() => {
            apiGetDepartments({ limit: 100, offset: 0 }).then(res => setDepartments(res.data.results))
        }, [])

        const handleSelectOnChange = e => {
            setValue(e.target.value)
        }

        return (
            <TextField
                variant="standard"
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
                {departments.length > 0 &&
                    departments
                        .filter(department => department.active)
                        .map(department => (
                            <MenuItem
                                key={department._id}
                                value={department.name}
                                sx={{ fontSize: '1.3rem', color: theme.palette.primary.main }}
                            >
                                {department.name}
                            </MenuItem>
                        ))}
            </TextField>
        )
    }

    return name === 'birth' ? (
        <DatePickerCustomInput value={value} setValue={setValue} error={error} />
    ) : name === 'gender' ? (
        <GenderPicker />
    ) : name === 'department' ? (
        <Department value={value} setValue={setValue} error={error} />
    ) : (
        <TextField
            error={error}
            helperText={handleHelperText(name)}
            disabled={name === 'id' && mode === 'edit'}
            label={label}
            variant="standard"
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
