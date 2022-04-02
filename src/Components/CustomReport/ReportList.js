import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Assignment } from '@mui/icons-material'
import useStyles from './Style'

const ReportList = ({ patient }) => {
    const classes = useStyles()
    return (
        <Box sx={{ height: '100%', padding: '.5rem' }}>
            <Box className={classes.formLabel}>歷史報告</Box>
            <List>
                {patient.reports.map((report, index) => (
                    <ListItem key={report.id}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary={report.updateTime} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default ReportList
