import { useState } from 'react'
import useStyles from './Style'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Box, Select, MenuItem } from '@mui/material'

const CustomNavbar = () => {
    const [event, setEvent] = useState()
    const classes = useStyles()
    const { isOpen } = useSelector(state => state.sidebar)
    const { results } = useSelector(state => state.event)

    const handleChange = e => {
        setEvent(e.target.value)
    }

    return (
        <AppBar elevation={0} position="fixed" className={`${classes.container} ${isOpen || 'close'}`}>
            <Toolbar className={classes.toolbar} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box></Box>
                <Box>
                    <Select variant="outlined" value={event} onChange={handleChange} label="Age" sx={{ minWidth: '10rem' }}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default CustomNavbar
