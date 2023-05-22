import React, { useEffect } from 'react'
import { useTheme } from '@mui/styles'
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from 'react-redux'
import { closeAlert } from '../../Redux/Slices/Alert'
import './style.css'

const CustomAlert = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const { isOpen, type, toastTitle, alertTitle, text, icon, event, preConfirm } = useSelector(state => state.alert)

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        customClass: { container: 'alert' },
        background: theme.palette.background.secondary,
        didOpen: toast => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
    })

    useEffect(() => {
        if (isOpen) {
            switch (type) {
                case 'confirm':
                    Swal.fire({
                        title: alertTitle,
                        backdrop: false,
                        showCancelButton: true,
                        confirmButtonText: '確定',
                        confirmButtonColor: theme.palette.primary.main,
                        cancelButtonText: `取消`,
                        background: theme.palette.background.secondary,
                    }).then(result => {
                        if (result.isConfirmed) {
                            event().then(() =>
                                Toast.fire({
                                    icon: icon,
                                    title: toastTitle,
                                    text: text,
                                }).then(handleClose)
                            )
                        } else {
                            handleClose()
                        }
                    })
                    break
                case 'input':
                    Swal.fire({
                        title: alertTitle,
                        input: 'text',
                        backdrop: false,
                        showCancelButton: true,
                        confirmButtonText: '確定',
                        confirmButtonColor: theme.palette.primary.main,
                        cancelButtonText: `取消`,
                        background: theme.palette.background.secondary,
                        inputValidator: text => {
                            return !text && '輸入點什麼吧'
                        },
                        preConfirm: async text => {
                            const { exists, warning } = await preConfirm(text)
                            return !exists ? event(text) : Swal.showValidationMessage(warning)
                        },
                    }).then(result => {
                        if (result.isConfirmed) {
                            Toast.fire({
                                icon,
                                title: toastTitle,
                                text,
                            }).then(handleClose)
                        } else {
                            handleClose()
                        }
                    })
                    break
                default:
                    Toast.fire({
                        icon,
                        title: toastTitle,
                        text,
                    }).then(handleClose)
            }
        }
    }, [isOpen])

    const handleClose = () => dispatch(closeAlert())

    return <div />
}

export default CustomAlert
