import React from 'react'
import { Box, Chip, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Close } from '@mui/icons-material'

import useStyles from './Style'

import { closeDialog } from '../../Redux/Slices/Dialog'
import CustomReportForm from '../CustomReport/CustomReportForm'
import ReportFormHtml from './ReportFormHtml'
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'

const ReportDialog = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { isOpen, row } = useSelector(state => state.dialog.report)
    const { patient } = row
    const handleClose = () => dispatch(closeDialog({ type: 'report' }))
    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth={'lg'}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip label={`${patient.id} / ${patient.name} / ${patient.gender}`} variant="outlined" sx={{ fontSize: '1.1rem' }} />
                <IconButton onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ height: '86vh' }}>
                {/* <CustomReportForm lists={[Liver, Gallbladder, Kidney, Pancreas, Spleen, Suggestion]} patient={row.patient} type="edit" /> */}
                <CustomScrollbar>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ReportFormHtml row={row} />
                    </Box>
                </CustomScrollbar>
            </DialogContent>
        </Dialog>
    )
}

export default ReportDialog
