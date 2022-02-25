import React from "react";
import Router from "../Router";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import useStyles from "./Style";

import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Box className={classes.container}>
        <Sidebar />

        <Router />
      </Box>
    </BrowserRouter>
  );
};

export default Layout;
