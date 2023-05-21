import React, { useCallback } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'

import { closeDialog } from '../../Redux/Slices/Dialog'

import { useTheme } from '@mui/styles'

import CustomForm from '../CustomForm/CustomForm'
import useStyles from './Style'
import { Close } from '@mui/icons-material'

const CustomDialog = ({ title, type, mode }) => {
    const { isOpen, row } = useSelector(state => state.dialog[type])

    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme()

    return (
        <Dialog open={isOpen} classes={{ paper: classes.dialogPaper }} maxWidth="md" onClose={() => dispatch(closeDialog({ type }))}>
            <DialogTitle>
                <Box sx={{ fontSize: '2.4rem' }}>{title}</Box>
                <IconButton
                    onClick={() => dispatch(closeDialog({ type }))}
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        color: theme => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <CustomForm row={row} type={type} mode={mode} />
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog
