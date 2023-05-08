import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Assignment } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import useStyles from './Style'
import { fetchReportByReportID } from '../../Redux/Slices/Dialog'
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'

const ReportList = ({ patient }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleClick = reportID => {
        dispatch(fetchReportByReportID(reportID))
    }
    return (
        <List>
            {patient?.report?.records.map((report, index) => (
                <ListItem key={report._id} classes={{ root: classes.reportListItem }} onClick={() => handleClick(report._id)}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Assignment />
                        </ListItemIcon>
                        <ListItemText primary={`第${index + 1}次報告`} secondary={new Date(report.createdAt).toLocaleDateString()} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default ReportList
