import React, { useState, useEffect, useMemo } from 'react'
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    IconButton,
    ListItem,
    ListItemText,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material'
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
import { openAlert } from '../../Redux/Slices/Alert'

const ReportDialog = ({ mode }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {
        isOpen,
        row: { patient, reports },
    } = useSelector(state => state.dialog.report)
    // reverse records and non-destructive
    const reverseRecords = useMemo(() => [].concat(reports?.records).reverse(), [reports])

    const currentReport = useSelector(state => state.report.edit)

    const [records, setRecords] = useState([])
    const [version, setVersion] = useState('')
    const [reportID, setReportID] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    // 當Dialog開啟時，將最新的報告紀錄寫入Report State，並記錄該報告的ID
    useEffect(() => {
        if (reverseRecords.length > 0 && isOpen) {
            dispatch(fillReport({ report: reverseRecords[0] }))
            setReportID(reports.id)
            setRecords(reverseRecords)
            setVersion(reverseRecords[0]._id)
        }
    }, [isOpen])

    useEffect(() => {
        dispatch(fillReport({ report: reverseRecords.find(r => r?._id === version) }))
    }, [version])

    const handleEdit = () => {
        // 點擊編輯按鈕後判斷目前Dialog狀態，如果為編輯狀態則儲存
        if (isEditing) {
            dispatch(updateReport({ patient, reportID, report: currentReport }))
            dispatch(openAlert({ title: '修改成功', icon: 'success' }))
            handleClose()
        } else {
            setIsEditing(true)
        }
    }
    const handleClose = () => {
        dispatch(closeDialog({ type: 'report' }))
        dispatch(resetReport({ mode: 'edit' }))
        setIsEditing(false)
    }
    const handleSelectOnChange = e => {
        setVersion(e.target.value)
    }

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth={'md'}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', padding: '.5rem 2rem' }}>
                <ListItemText secondary={`${patient.id} / ${patient.name} / ${patient.gender}`} />
                {mode === 'edit' && (
                    <FormControl variant="standard" sx={{ width: '5rem' }}>
                        <InputLabel id="select-label">版本</InputLabel>
                        <Select labelId="select-label" value={version} onChange={handleSelectOnChange}>
                            {records?.map((record, index) => (
                                <MenuItem key={record._id} value={record._id}>{`v${records.length - index}`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

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
                    <ReportFormHtml />
                )}
            </DialogContent>
            <DialogActions sx={{ padding: '1rem' }}>
                {mode === 'edit' && (
                    <>
                        <Button variant="contained" className={classes.actionButton} onClick={handleEdit}>
                            {isEditing ? '儲存' : '修改'}
                        </Button>
                        <Button variant="text" className={classes.actionButton} onClick={handleClose}>
                            取消
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default ReportDialog
