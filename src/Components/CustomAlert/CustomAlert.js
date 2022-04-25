import React, { useEffect, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useTheme } from '@mui/styles'
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from 'react-redux'
import { closeAlert } from '../../Redux/Slices/Alert'

const CustomAlert = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const { isOpen, isConfirm, title, text, icon, event } = useSelector(state => state.alert)

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
            isConfirm
                ? Swal.fire({
                      title: '確定執行此操作?',
                      backdrop: false,
                      showCancelButton: true,
                      confirmButtonText: '確定',
                      confirmButtonColor: theme.palette.primary.main,
                      cancelButtonText: `取消`,
                  }).then(result => {
                      if (result.isConfirmed) {
                          Toast.fire({
                              icon: icon,
                              title: title,
                              text: text,
                          }).then(handleClose)
                          dispatch(event)
                      } else {
                          handleClose()
                      }
                  })
                : Toast.fire({
                      icon: icon,
                      title: title,
                      text: text,
                  }).then(handleClose)
        }
    }, [isOpen])

    const handleClose = () => dispatch(closeAlert())

    return (
        <div />
        // <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={isOpen} autoHideDuration={3000} onClose={handleClose}>
        //     {/* <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        //         {message}
        //     </Alert> */}
        // </Snackbar>
    )
}

export default CustomAlert
