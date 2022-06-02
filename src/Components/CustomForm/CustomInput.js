import React, { useRef } from 'react'
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useTheme } from '@mui/styles'

import { LocalizationProvider, DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { zhTW } from 'date-fns/locale'

import useStyles from './Style'

const CustomInput = ({ label, name, value, setValue, handleChange, handleHelperText, error, mode, required }) => {
    const classes = useStyles()
    const theme = useTheme()

    const DatePickerCustomInput = ({ value, setValue }) => {
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={zhTW}>
                <DatePicker
                    disableFuture
                    inputFormat="yyyy/MM/dd"
                    label="生日"
                    required
                    views={['year', 'day']}
                    openTo="year"
                    value={value}
                    onChange={newValue => {
                        setValue(new Date(newValue))
                    }}
                    InputProps={{
                        style: {
                            fontSize: '1.3rem',
                            color: theme.palette.primary.main,
                        },
                        readOnly: true,
                    }}
                    InputLabelProps={{ style: { fontSize: '1.3rem', color: theme.palette.primary.main } }}
                    renderInput={params => <TextField variant="standard" className={classes.textField} {...params} />}
                />
            </LocalizationProvider>
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

    return name === 'birth' ? (
        <DatePickerCustomInput value={value} setValue={setValue} />
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
