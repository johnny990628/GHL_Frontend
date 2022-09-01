import React, { useState, useEffect, useRef } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    IconButton,
    ListItemText,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Close, Print } from '@mui/icons-material'
import { v4 } from 'uuid'
import { useReactToPrint } from 'react-to-print'

import useStyles from './Style'

import Gallbladder from '../../Assets/OrganJson/gallbladder.json'
import Kidney from '../../Assets/OrganJson/kidney.json'
import Liver from '../../Assets/OrganJson/liver.json'
import Pancreas from '../../Assets/OrganJson/pancreas.json'
import Spleen from '../../Assets/OrganJson/spleen.json'
import Suggestion from '../../Assets/OrganJson/suggestion.json'
import { closeDialog } from '../../Redux/Slices/Dialog'
import CustomReportForm from '../CustomReport/CustomReportForm'
import ReportFormHtml, { ReportFormForPDF } from './ReportFormHtml'
import { updateReport, fillReport, resetReport } from '../../Redux/Slices/ReportForm'
import { openAlert } from '../../Redux/Slices/Alert'
import { Box } from '@mui/system'
import Authorized from './../Authorized/Authorized'

const ReportDialog = ({ mode }) => {
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

    const handleEdit = () => {
        // 點擊編輯按鈕後判斷目前Dialog狀態，如果為編輯狀態則儲存
        if (isEditing) {
            dispatch(updateReport({ reportID, data: { report: { ...report, id: v4() }, status: 'finished' } }))
            dispatch(
                openAlert({
                    toastTitle: '報告修改成功',
                    text: `${patient.name} ${patient.gender === 'm' ? '先生' : '小姐'}`,
                })
            )
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

                {mode === 'edit' && (
                    <FormControl variant="standard" sx={{ width: '5rem' }}>
                        <InputLabel id="select-label">版本</InputLabel>
                        <Select labelId="select-label" value={version} onChange={handleSelectOnChange}>
                            {records.length > 0 &&
                                records.map((record, index) => (
                                    <MenuItem key={record.id} value={record.id}>{`v${records.length - index}`}</MenuItem>
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
                    <>
                        <ReportFormHtml />
                        {/* For PDF Print */}
                        <Box sx={{ display: 'none' }}>
                            <ReportFormForPDF ref={formRef} />
                        </Box>
                    </>
                )}
            </DialogContent>
            <DialogActions sx={{ padding: '1rem' }}>
                {mode === 'edit' && (
                    <Authorized currentRole={currentUser.role} authority={[3, 2]} noMatch={<></>}>
                        <Button variant="contained" className={classes.actionButton} onClick={handleEdit}>
                            {isEditing ? '儲存' : '修改'}
                        </Button>
                        <Button variant="text" className={classes.actionButton} onClick={handleClose}>
                            取消
                        </Button>
                    </Authorized>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default ReportDialog
