import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Assignment } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import useStyles from './Style'
import { openDialog } from '../../Redux/Slices/Dialog'

const ReportList = ({ patient }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleClick = ({ report }) => {
        dispatch(openDialog({ type: 'report', row: { patient, report } }))
    }
    return (
        <>
            <Box className={classes.formLabel}>歷史報告</Box>
            <List>
                {patient.reports.map((report, index) => (
                    <ListItem key={report.id} classes={{ root: classes.reportListItem }} onClick={() => handleClick({ report })}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary={`第${index + 1}次`} secondary={report.updateTime} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default ReportList
