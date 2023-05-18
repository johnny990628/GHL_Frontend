import React, { useCallback } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'

import { closeDialog } from '../../Redux/Slices/Dialog'
import { updatePatient } from '../../Redux/Slices/Patient'
import { useTheme } from '@mui/styles'

import CustomForm from '../../Components/CustomForm/CustomForm'
import useStyles from './Style'
import { Close } from '@mui/icons-material'

const PatientDialog = () => {
    const { isOpen, row } = useSelector(state => state.dialog.patient)

    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme()

    const sendData = useCallback(data => dispatch(updatePatient(data), []))

    return (
        <Dialog
            open={isOpen}
            classes={{ paper: classes.dialogPaper }}
            maxWidth="md"
            onClose={() => dispatch(closeDialog({ type: 'patient' }))}
        >
            <DialogTitle>
                <Box sx={{ fontSize: '2.4rem' }}>修改病人</Box>
                <IconButton
                    onClick={() => dispatch(closeDialog({ type: 'patient' }))}
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
                <CustomForm row={row} mode="edit" sendData={sendData} />
            </DialogContent>
        </Dialog>
    )
}

export default PatientDialog
