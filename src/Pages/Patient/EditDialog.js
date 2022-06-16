import React, { useCallback } from 'react'
import { Dialog, DialogContent } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { closeDialog } from '../../Redux/Slices/Dialog'
import { updatePatient } from '../../Redux/Slices/Patient'

import CustomForm from '../../Components/CustomForm/CustomForm'

const EditDialog = () => {
    const { isOpen, row } = useSelector(state => state.dialog.patient)

    const dispatch = useDispatch()

    const sendData = useCallback(data => dispatch(updatePatient(data), []))

    return (
        <Dialog open={isOpen} onClose={() => dispatch(closeDialog({ type: 'patient' }))}>
            <DialogContent>
                <CustomForm title="修改病人" row={row} mode="edit" sendData={sendData} />
            </DialogContent>
        </Dialog>
    )
}

export default EditDialog
