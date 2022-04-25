import React, { useEffect, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from 'react-redux'
import { closeSnackbar } from '../../Redux/Slices/Alert'

const CustomSnackbar = () => {
    const dispatch = useDispatch()
    const { isOpen, message } = useSelector(state => state.snackbar)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: toast => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
    })

    useEffect(() => {
        if (isOpen) {
            Toast.fire({
                icon: 'success',
                title: message,
            }).then(handleClose)
        }
    }, [isOpen])

    const handleClose = () => dispatch(closeSnackbar())

    return (
        <div />
        // <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        //     {/* <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        //         {message}
        //     </Alert> */}
        // </Snackbar>
    )
}

export default CustomSnackbar
