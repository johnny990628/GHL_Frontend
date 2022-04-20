import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Assignment } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import useStyles from './Style'
import { openDialog } from '../../Redux/Slices/Dialog'
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'

const ReportList = ({ patient }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleClick = ({ reports }) => {
        dispatch(openDialog({ type: 'report', row: { patient, reports } }))
    }
    return (
        <CustomScrollbar>
            <Box className={classes.formLabel}>歷史報告</Box>
            <List>
                {patient.reports.map((report, index) => (
                    <ListItem
                        key={report.id}
                        classes={{ root: classes.reportListItem }}
                        onClick={() => handleClick({ reports: { id: report._id, records: report.records } })}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary={`第${index + 1}次`} secondary={new Date(report.createdAt).toLocaleDateString()} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </CustomScrollbar>
    )
}

export default ReportList
