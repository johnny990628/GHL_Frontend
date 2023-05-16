import { useEffect, useState } from 'react'
import useStyles from './Style'
import { useDispatch, useSelector } from 'react-redux'
import Avatar, { genConfig } from 'react-nice-avatar'
import { AppBar, Toolbar, Box, Select, MenuItem, FormControl, InputLabel, TextField, IconButton, Button } from '@mui/material'
import { fetchEvent4List } from '../../Redux/Slices/Event4List'
import { Logout, Search } from '@mui/icons-material'
import { logout } from '../../Redux/Slices/Auth'
import { apiRegisterEvent } from '../../Axios/Event'
import { useLocation } from 'react-router-dom'
import { patientTrigger } from '../../Redux/Slices/Patient'
import { scheduleTrigger } from '../../Redux/Slices/Schedule'
import { departmentTrigger } from '../../Redux/Slices/Department'
import { userTrigger } from '../../Redux/Slices/User'
import { eventTrigger } from '../../Redux/Slices/Event'

const CustomNavbar = () => {
    const [event, setEvent] = useState('all')
    const classes = useStyles()
    const dispatch = useDispatch()
    const location = useLocation()
    const { isOpen } = useSelector(state => state.sidebar)
    const { user } = useSelector(state => state.auth)
    const { events } = useSelector(state => state.event4List)

    useEffect(() => {
        dispatch(fetchEvent4List())
    }, [])

    const handleEventChange = () => {
        switch (location.pathname) {
            case '/patient':
                dispatch(patientTrigger())
                break
            case '/report':
                dispatch(scheduleTrigger())
                break
        }
    }

    const handleChange = async e => {
        setEvent(e.target.value)
        await apiRegisterEvent(e.target.value)
        handleEventChange()
    }

    const config = genConfig(user.username)

    const roleConfig = role => {
        switch (role) {
            case 1:
                return '行政及護理師'
            case 2:
                return '醫師'
            case 3:
                return '管理員'
            default:
                return ''
        }
    }

    return (
        <AppBar elevation={0} position="fixed" className={`${classes.container} ${isOpen || 'close'}`}>
            <Toolbar className={classes.toolbar} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="./logo.gif" className={classes.logo} alt="logo" style={{ width: '2.8rem', height: '2.8rem' }} />
                    <Box sx={{ color: 'primary.main', fontSize: '1.8rem', ml: 1 }}>奇異鳥報告系統</Box>
                    <FormControl sx={{ width: '10rem', ml: 4 }} size="small">
                        <InputLabel id="event-select-label">選擇活動</InputLabel>
                        <Select labelId="event-select-label" variant="outlined" value={event} onChange={handleChange} label="選擇活動">
                            <MenuItem value="all">
                                <em>所有活動</em>
                            </MenuItem>
                            {events.map(e => (
                                <MenuItem key={e._id} value={e._id}>
                                    {e.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            style={{
                                width: '2.5rem',
                                height: '2.5rem',
                            }}
                            {...config}
                        ></Avatar>
                        <Box ml={2}>
                            <Box sx={{ color: 'primary.main' }}>{user.name}</Box>
                            <Box sx={{ fontSize: '.9rem', color: 'gray.main' }}>{roleConfig(user.role)}</Box>
                        </Box>
                    </Box>
                    <Button variant="outlined" startIcon={<Logout />} sx={{ ml: 4 }} onClick={() => dispatch(logout())}>
                        登出
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default CustomNavbar
