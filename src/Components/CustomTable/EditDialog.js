import React, { useState } from 'react'
import { Dialog, DialogContent, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { closeDialog } from '../../Redux/Slices/Dialog'
import { updatePatient } from '../../Redux/Slices/Patient'

import CustomForm from '../CustomForm/CustomForm'
import { apiUpdatePatient } from '../../Axios/Patient'

const EditDialog = () => {
    const { isOpen, row } = useSelector(state => state.dialog.patient)

    const dispatch = useDispatch()

    const handleSubmit = fields => apiUpdatePatient(fields.id, fields)

    return (
        <Dialog open={isOpen} onClose={() => dispatch(closeDialog({ type: 'patient' }))}>
            {/* <DialogTitle>修改</DialogTitle> */}
            <DialogContent>
                <CustomForm title="修改病人" row={row} mode="edit" handleSubmit={handleSubmit} />
            </DialogContent>
        </Dialog>
    )
}

export default EditDialog
