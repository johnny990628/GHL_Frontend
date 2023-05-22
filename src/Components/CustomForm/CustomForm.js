import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useTheme } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Style'

import CustomInput from './CustomInput'
import { closeDialog } from '../../Redux/Slices/Dialog'

import useForm from './useForm'

const CustomForm = ({ type, row, mode }) => {
    const { inputModel, handleChange, handleSubmit, handleUpdate, handleHelperText, errorField } = useForm(type)
    const classes = useStyles()
    const theme = useTheme()
    const dispatch = useDispatch()

    useEffect(() => {
        if (row) {
            inputModel.forEach(({ name, setValue }) => {
                setValue(row[name])
            })
        }
    }, [])

    const handleClickSubmit = () => {
        mode === 'create' ? handleSubmit() : handleUpdate()
    }

    return (
        <Box className={classes.formWrapper}>
            <Box className={classes.formContainer}>
                <Box className={classes.formBody}>
                    {inputModel.map(model => (
                        <Box key={model.name} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ fontSize: '1.3rem', minWidth: '13rem' }}>{model.label}</Box>
                            <CustomInput
                                handleChange={handleChange}
                                handleHelperText={handleHelperText}
                                error={errorField.includes(model.name)}
                                mode={mode}
                                {...model}
                            />
                        </Box>
                    ))}

                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '2rem' }}>
                        <Button
                            className={classes.button}
                            sx={{
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.background.default,
                                },
                            }}
                            onClick={() => {
                                dispatch(closeDialog({ type }))
                            }}
                        >
                            取消
                        </Button>
                        <Button variant="contained" className={classes.button} onClick={handleClickSubmit}>
                            儲存
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CustomForm
