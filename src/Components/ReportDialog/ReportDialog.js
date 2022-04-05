import React from 'react'
import { Box, Dialog, DialogContent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Gallbladder from '../../Assets/OrganJson/gallbladder.json'
import Kidney from '../../Assets/OrganJson/kidney.json'
import Liver from '../../Assets/OrganJson/liver.json'
import Pancreas from '../../Assets/OrganJson/pancreas.json'
import Spleen from '../../Assets/OrganJson/spleen.json'
import Suggestion from '../../Assets/OrganJson/suggestion.json'
import { closeDialog } from '../../Redux/Slices/Dialog'
import CustomReportForm from '../CustomReport/CustomReportForm'

const ReportDialog = () => {
    const dispatch = useDispatch()
    const { isOpen, row } = useSelector(state => state.dialog.report)

    return (
        <Dialog open={isOpen} onClose={() => dispatch(closeDialog({ type: 'report' }))} fullWidth maxWidth={'xl'}>
            <DialogContent sx={{ height: '80vh' }}>
                <CustomReportForm lists={[Liver, Gallbladder, Kidney, Pancreas, Spleen, Suggestion]} patient={row.patient} type="edit" />
            </DialogContent>
        </Dialog>
    )
}

export default ReportDialog
