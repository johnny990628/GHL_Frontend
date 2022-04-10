import React, { useEffect, useState } from 'react'
import { Box, Dialog, DialogContent, DialogTitle, IconButton, ListItem, ListItemText } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Close, FormatListBulleted } from '@mui/icons-material'

import useStyles from './Style'

import { closeDialog } from '../../Redux/Slices/Dialog'
import CustomReportForm from '../CustomReport/CustomReportForm'
import ReportFormHtml from './ReportFormHtml'
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'

const ReportDialog = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {
        isOpen,
        row: { patient, report },
    } = useSelector(state => state.dialog.report)

    const handleClose = () => dispatch(closeDialog({ type: 'report' }))

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth={'lg'}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', padding: '.5rem 2rem' }}>
                <ListItemText
                    primary={`${patient.id} / ${patient.name} / ${patient.gender}`}
                    secondary={`第${patient.reports.findIndex(r => r.id === report.id) + 1}次報告-${new Date(
                        report.createdAt
                    ).toLocaleDateString()}`}
                />
                {/* <Box className={classes.title}>{`${patient.id} / ${patient.name} / ${patient.gender}`}</Box> */}
                {/* <IconButton onClick={handleClose} sx={{ padding: '0 1.3rem', margin: '.2rem' }}>
                    <Close />
                </IconButton> */}
            </DialogTitle>
            <DialogContent sx={{ height: '90vh' }}>
                {/* <CustomReportForm lists={[Liver, Gallbladder, Kidney, Pancreas, Spleen, Suggestion]} patient={row.patient} type="edit" /> */}
                <CustomScrollbar>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ReportFormHtml report={report} />
                    </Box>
                </CustomScrollbar>
            </DialogContent>
        </Dialog>
    )
}

export default ReportDialog
