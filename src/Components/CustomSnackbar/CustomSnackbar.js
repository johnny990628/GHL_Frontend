import React, { useEffect, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'
import { closeSnackbar } from '../../Redux/Slices/Snackbar'

const CustomSnackbar = () => {
    const dispatch = useDispatch()
    const { isOpen, message } = useSelector(state => state.snackbar)

    const handleClose = () => dispatch(closeSnackbar())

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar
