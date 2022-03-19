import React, { useState } from 'react'
import { Box, FormControlLabel, Checkbox, Tabs, Tab, AppBar, Toolbar, Divider } from '@mui/material'
import Scrollspy from 'react-scrollspy'
import useStyles from './Style'
import CustomReportColumn from './CustomReportInput'
import CustomScrollbar from '../../Components/CustomScrollbar/CustomScrollbar'

const CustomReportForm = ({ lists, patient }) => {
    const classes = useStyles()
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <>
            <Box className={classes.container}>
                <Scrollspy items={lists.map(list => list.name)} className={classes.scrollspy}>
                    <Tabs value={tabIndex} orientation="vertical">
                        {lists.map((list, index) => (
                            <Tab
                                key={list.name}
                                label={list.label}
                                disableRipple
                                component="a"
                                href={`#${list.name}`}
                                className={classes.scrollspyButton}
                                onClick={() => setTabIndex(index)}
                            />
                        ))}
                    </Tabs>
                </Scrollspy>

                <CustomScrollbar>
                    {lists.map(list => (
                        <Box key={list.name} id={list.name} className={classes.formContainer}>
                            <Box className={classes.formLabel}>{list.label}</Box>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label={<Box className={classes.inputLabel}>正常</Box>}
                            />
                            <Box>
                                {list.cols.map(row => (
                                    <CustomReportColumn key={row.name} row={row} />
                                ))}
                            </Box>
                        </Box>
                    ))}
                </CustomScrollbar>
            </Box>
        </>
    )
}

export default CustomReportForm
