import React from "react";
import { Link, useLocation } from "react-router-dom";
import { List, ListItem, Box, Drawer } from "@mui/material";
import useStyles from "./Style";

import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const classes = useStyles();
  const location = useLocation();
  const activeItem = SidebarItem.findIndex((item) => item.route === location.pathname);
  return (
    <Drawer variant={"permanent"} classes={{ paper: classes.container }}>
      <img src={require("../../Assets/Image/GHL.png")} className={classes.logo} />

      <List className={classes.list}>
        {SidebarItem.map((item, index) => (
          <Link to={item.route} className={classes.link}>
            <ListItem button disableRipple key={item.display_name}>
              {item.icon}
              <Box className={`${classes.text} ${index === activeItem && "active"}`}>{item.display_name}</Box>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
