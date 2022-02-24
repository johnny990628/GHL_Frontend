import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer } from '@mui/material';
import useStyles from './Style';

import SidebarItem from './SidebarItem.json';

const Sidebar = () => {
    const classes = useStyles();
    const location = useLocation();
    const activeItem = SidebarItem.findIndex((item) => item.route === location.pathname);
    return (
        <Drawer variant={'permanent'} classes={{ paper: classes.container }}>
            <List className={classes.list}>
                {SidebarItem.map((item, index) => (
                    <Link to={item.route} className={classes.link}>
                        <ListItem button disableRipple key={item.display_name}>
                            <ListItemText
                                primary={item.display_name}
                                className={`${classes.item} ${index === activeItem && 'active'}`}
                                primaryTypographyProps={{ fontSize: '1.4rem' }}
                            />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
