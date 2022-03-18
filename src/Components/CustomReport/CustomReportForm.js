import React from 'react'
import { Box, FormControlLabel, Checkbox, List, ListItem, ListItemText } from '@mui/material'
import Scrollspy from 'react-scrollspy'
import useStyles from './Style'
import CustomReportColumn from './CustomReportInput'
import CustomScrollbar from '../../Components/CustomScrollbar/CustomScrollbar'

const CustomReportForm = ({ lists }) => {
    const classes = useStyles()
    return (
        <Box className={classes.container}>
            <Scrollspy items={lists.map(list => list.name)} className={classes.scrollspy}>
                {lists.map(list => (
                    <ListItem button disableRipple component="a" href={`#${list.name}`} className={classes.scrollspyButton}>
                        <ListItemText primary={list.label} classes={{ primary: classes.linkLabel }} />
                    </ListItem>
                ))}
            </Scrollspy>

            <CustomScrollbar>
                {lists.map(list => (
                    <Box id={list.name} className={classes.formContainer}>
                        <Box className={classes.formLabel}>{list.label}</Box>
                        <FormControlLabel control={<Checkbox defaultChecked />} label={<Box className={classes.inputLabel}>正常</Box>} />
                        <Box>
                            {list.cols.map(row => (
                                <CustomReportColumn key={row.name} row={row} />
                            ))}
                        </Box>
                    </Box>
                ))}
            </CustomScrollbar>
        </Box>
    )
}

export default CustomReportForm
