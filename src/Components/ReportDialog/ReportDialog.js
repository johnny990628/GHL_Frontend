import React, { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogTitle, IconButton, ListItemText, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Print } from '@mui/icons-material'

import { useReactToPrint } from 'react-to-print'

import useStyles from './Style'

import { closeDialog } from '../../Redux/Slices/Dialog'

import ReportFormHtml, { ReportFormForPDF } from './ReportFormHtml'
import { fillReport, resetReport } from '../../Redux/Slices/ReportForm'

import { Box } from '@mui/system'

const ReportDialog = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {
        isOpen,
        row: { patient, user, createdAt, updatedAt, records, reportID },
    } = useSelector(state => state.dialog.report)

    const report = useSelector(state => state.reportForm.edit)
    const { user: currentUser } = useSelector(state => state.auth)
    const [version, setVersion] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    // 當Dialog開啟時，將最新的報告紀錄寫入Report State，並記錄該報告的ID
    useEffect(() => {
        if (records.length > 0 && isOpen) {
            dispatch(fillReport({ report: records[0] }))
            setVersion(records[0].id)
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) dispatch(fillReport({ report: records.find(r => r.id === version) }))
    }, [version])

    const handleClose = () => {
        dispatch(closeDialog({ type: 'report' }))
        dispatch(resetReport({ mode: 'edit' }))
        setIsEditing(false)
    }
    const handleSelectOnChange = e => {
        setVersion(e.target.value)
    }

    const formRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => formRef.current,
    })

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth={'md'}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', padding: '.5rem 2rem' }}>
                {!isEditing && (
                    <IconButton onClick={handlePrint} sx={{ marginRight: '1rem' }}>
                        <Print />
                    </IconButton>
                )}
                <ListItemText
                    primary={`${
                        patient ? `${patient.id} / ${patient.name} / ${patient.gender === 'm' ? '先生' : '小姐'}` : '無病人資料'
                    } (${user ? `${user.name}醫師` : '無醫師資料'})`}
                    secondary={
                        <Box>
                            <Box>{`建立 : ${new Date(createdAt).toLocaleString()}`}</Box>
                            <Box>{`更新 : ${new Date(updatedAt).toLocaleString()}`}</Box>
                        </Box>
                    }
                />

                <FormControl variant="standard" sx={{ width: '5rem' }}>
                    <InputLabel id="select-label">版本</InputLabel>
                    <Select labelId="select-label" value={version} onChange={handleSelectOnChange}>
                        {records.length > 0 &&
                            records.map((record, index) => (
                                <MenuItem key={record.id} value={record.id}>{`v${records.length - index}`}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </DialogTitle>
            <DialogContent sx={{ height: '90vh', display: 'flex', justifyContent: 'center' }}>
                <ReportFormHtml />
                {/* For PDF Print */}
                <Box sx={{ display: 'none' }}>
                    <ReportFormForPDF ref={formRef} />
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ReportDialog
