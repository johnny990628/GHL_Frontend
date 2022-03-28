import React, { useState } from 'react'
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useTheme } from '@mui/styles'
import DatePicker from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { useSelector } from 'react-redux'
import MyCustomLocale from './MyCustomLocale'
import useStyles from './Style'

const CustomInput = ({ label, name, value, setValue, handleChange, handleHelperText, error, mode, required, age }) => {
    const classes = useStyles()
    const theme = useTheme()

    const DatePickerCustomInput = ({ ref }) => {
        return (
            <TextField
                error={error}
                ref={ref} // necessary
                value={value ? `${value.year}/${value.month}/${value.day} - ${age}歲` : ''}
                variant="standard"
                label="生日"
                required
                InputProps={{
                    style: {
                        fontSize: '1.3rem',
                        color: theme.palette.primary.main,
                    },
                    readOnly: true,
                }}
                InputLabelProps={{ style: { fontSize: '1.3rem', color: theme.palette.primary.main } }}
                className={classes.textField}
            />
        )
    }

    const GenderPicker = () => {
        return (
            <FormControl className={classes.textField}>
                <FormLabel id="genderPicker" sx={{ fontSize: '1.5rem' }}>
                    性別
                </FormLabel>
                <RadioGroup row aria-labelledby="genderPicker" value={value} onChange={e => setValue(e.target.value)}>
                    <FormControlLabel value="女" control={<Radio />} label={<Box className={classes.labelText}>女</Box>} />
                    <FormControlLabel value="男" control={<Radio />} label={<Box className={classes.labelText}>男</Box>} />
                    <FormControlLabel value="其他" control={<Radio />} label={<Box className={classes.labelText}>其他</Box>} />
                </RadioGroup>
            </FormControl>
        )
    }

    return name === 'birth' ? (
        <DatePicker value={value} onChange={setValue} shouldHighlightWeekends renderInput={DatePickerCustomInput} locale={MyCustomLocale} />
    ) : name === 'gender' ? (
        <GenderPicker />
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
