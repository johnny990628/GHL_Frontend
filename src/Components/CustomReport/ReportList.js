import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Assignment } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import useStyles from './Style'
import { fetchReport, openDialog } from '../../Redux/Slices/Dialog'
import CustomScrollbar from '../CustomScrollbar/CustomScrollbar'

const ReportList = ({ patient }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const handleClick = reportID => {
        dispatch(fetchReport(reportID))
    }
    return (
        <CustomScrollbar>
            <Box className={classes.formLabel}>歷史報告</Box>
            <List>
                {patient.reports.map((report, index) => (
                    <>
                        {report.status === 'finished' && (
                            <ListItem key={report._id} classes={{ root: classes.reportListItem }} onClick={() => handleClick(report._id)}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Assignment />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`第${index + 1}次報告`}
                                        secondary={new Date(report.createdAt).toLocaleDateString()}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </>
                ))}
            </List>
        </CustomScrollbar>
    )
}

export default ReportList
