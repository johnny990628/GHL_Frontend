import React, { useState, useEffect } from 'react'
import { Box, Dialog, DialogContent, DialogTitle, DialogActions, IconButton, ListItem, ListItemText, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Close, ConnectingAirportsOutlined, FormatListBulleted } from '@mui/icons-material'

import useStyles from './Style'

import Gallbladder from '../../Assets/OrganJson/gallbladder.json'
import Kidney from '../../Assets/OrganJson/kidney.json'
import Liver from '../../Assets/OrganJson/liver.json'
import Pancreas from '../../Assets/OrganJson/pancreas.json'
import Spleen from '../../Assets/OrganJson/spleen.json'
import Suggestion from '../../Assets/OrganJson/suggestion.json'
import { closeDialog } from '../../Redux/Slices/Dialog'
import CustomReportForm from '../CustomReport/CustomReportForm'
import ReportFormHtml from './ReportFormHtml'
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'
import { fillReport, resetReport } from '../../Redux/Slices/Report'
import { updateReport } from '../../Redux/Slices/Patient'
import { openSnackbar } from '../../Redux/Slices/Snackbar'

const ReportDialog = ({ mode }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {
        isOpen,
        row: { patient, reports },
    } = useSelector(state => state.dialog.report)

    const currentReport = useSelector(state => state.report.edit)
    const [reportID, setReportID] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        // 當Dialog開啟時，將最新的報告紀錄寫入Report State，並記錄該報告的ID
        if (reports.records?.length > 0 && isOpen) {
            dispatch(fillReport({ report: reports.records.slice(-1)[0] }))
            setReportID(reports.id)
        }
    }, [isOpen])

    const handleEdit = () => {
        // 點擊編輯按鈕後判斷目前Dialog狀態，如果為編輯狀態則儲存
        if (isEditing) {
            dispatch(updateReport({ patient, reportID, report: currentReport }))
            dispatch(openSnackbar('修改成功'))
            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
    }
    const handleClose = () => {
        dispatch(closeDialog({ type: 'report' }))
        dispatch(resetReport({ mode: 'edit' }))
        setIsEditing(false)
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth={'md'}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', padding: '.5rem 2rem' }}>
                <ListItemText primary={`${patient.id} / ${patient.name} / ${patient.gender}`} />
                {/* <Box className={classes.title}>{`${patient.id} / ${patient.name} / ${patient.gender}`}</Box> */}

                {mode === 'create' && (
                    <IconButton onClick={handleClose} sx={{ padding: '1rem' }}>
                        <Close />
                    </IconButton>
                )}
            </DialogTitle>
            <DialogContent sx={{ height: '90vh', display: 'flex', justifyContent: 'center' }}>
                {isEditing ? (
                    <CustomReportForm lists={[Liver, Gallbladder, Kidney, Pancreas, Spleen, Suggestion]} patient={patient} mode="edit" />
                ) : (
                    <ReportFormHtml report={currentReport} />
                )}
            </DialogContent>
            {mode === 'edit' && (
                <DialogActions sx={{ padding: '1rem' }}>
                    <Button variant="contained" className={classes.actionButton} onClick={handleEdit}>
                        修改
                    </Button>
                    <Button variant="text" className={classes.actionButton} onClick={handleClose}>
                        取消
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    )
}

export default ReportDialog
