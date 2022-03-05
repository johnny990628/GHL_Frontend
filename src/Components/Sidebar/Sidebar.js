import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, Box, Drawer, Tooltip } from '@mui/material';
import { Dehaze, DoubleArrow } from '@mui/icons-material';
import useStyles from './Style';

import SidebarItem from './SidebarItem';
import { openDrawer, closeDrawer } from '../../Redux/Slices/Drawer';

const Sidebar = () => {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const { open } = useSelector((state) => state.drawer);

    const activeItem = SidebarItem.findIndex((item) => item.route === location.pathname);

    return (
        <Drawer variant={'permanent'} classes={{ paper: `${classes.container} ${open || 'close'}` }}>
            {open && <img src={require('../../Assets/Image/GHL.png')} className={classes.logo} alt="logo" />}
            {open || (
                <Box className={classes.openIcon} onClick={() => dispatch(openDrawer())}>
                    <Dehaze />
                </Box>
            )}
            <List className={classes.list}>
                {SidebarItem.map((item, index) => (
                    <Link to={item.route} className={`${classes.link} ${index === activeItem && 'active'}`} key={item.display_name}>
                        <ListItem button disableRipple>
                            {open ? (
                                <Box className={classes.icon}>{item.icon}</Box>
                            ) : (
                                <Tooltip title={item.display_name} placement="right-start" arrow>
                                    <Box className={classes.icon}>{item.icon}</Box>
                                </Tooltip>
                            )}

                            {open && <Box className={`${classes.text} ${index === activeItem && 'active'}`}>{item.display_name}</Box>}
                        </ListItem>
                    </Link>
                ))}
            </List>
            {open && (
                <Box className={classes.closeIcon} onClick={() => dispatch(closeDrawer())}>
                    <DoubleArrow sx={{ transform: 'rotate(180deg)' }} />
                </Box>
            )}
        </Drawer>
    );
};

export default Sidebar;
