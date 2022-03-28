import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { List, ListItem, Box, Drawer, Tooltip, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Dehaze, DoubleArrow } from '@mui/icons-material'
import useStyles from './Style'

import SidebarItem from './SidebarItem'
import { openSidebar, closeSidebar } from '../../Redux/Slices/Sidebar'

const Sidebar = () => {
    const classes = useStyles()
    const location = useLocation()
    const dispatch = useDispatch()
    const { isOpen } = useSelector(state => state.sidebar)
    const theme = useTheme()
    const tab = useMediaQuery(theme.breakpoints.down('lg'))
    const firstRender = useRef(true)
    const activeItem = SidebarItem.findIndex(item => item.route === location.pathname)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        tab ? dispatch(closeSidebar()) : dispatch(openSidebar())
    }, [tab])

    return (
        <Drawer variant={'permanent'} classes={{ paper: `${classes.container} ${isOpen || 'close'}` }}>
            {isOpen ? (
                <img src="./GHL.png" className={classes.logo} alt="logo" />
            ) : (
                <Box className={classes.openIcon} onClick={() => dispatch(openSidebar())}>
                    <Dehaze />
                </Box>
            )}
            <List className={classes.list}>
                {SidebarItem.map((item, index) => (
                    <Link to={item.route} className={`${classes.link} ${index === activeItem && 'active'}`} key={item.display_name}>
                        <ListItem
                            button
                            disableRipple
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            {isOpen ? (
                                <Box className={classes.icon}>{item.icon}</Box>
                            ) : (
                                <Tooltip title={item.display_name} placement="right-start" arrow>
                                    <Box className={classes.icon}>{item.icon}</Box>
                                </Tooltip>
                            )}

                            {isOpen && <Box className={`${classes.text} ${index === activeItem && 'active'}`}>{item.display_name}</Box>}
                        </ListItem>
                    </Link>
                ))}
            </List>
            {isOpen && (
                <Box className={classes.closeIcon} onClick={() => dispatch(closeSidebar())}>
                    <DoubleArrow sx={{ transform: 'rotate(180deg)' }} />
                </Box>
            )}
            {isOpen && (
                <img
                    src="./logo2.jpg"
                    className={classes.logo}
                    alt="logo"
                    style={{ width: '3.8rem', height: '4rem', position: 'fixed', top: 2 }}
                />
            )}
        </Drawer>
    )
}

export default Sidebar
