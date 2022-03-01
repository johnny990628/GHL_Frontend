import React from "react";
import { Box, Grid } from "@mui/material";
import useStyles from "./Style";

const Home = () => {
  const classes = useStyles();
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item xs={8}>
        <Grid container sx={{ height: "30%", marginBottom: "1rem" }}>
          <Grid item xs={4}>
            <Box className={classes.box}></Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.box}></Box>
          </Grid>
          <Grid item xs={4}>
            <Box className={classes.box}></Box>
          </Grid>
        </Grid>
        <Grid container sx={{ height: "40%" }}>
          <Grid item xs={12}>
            <Box className={classes.box}></Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} sx={{ backgroundColor: "#ffffff" }}></Grid>
    </Grid>
  );
};

export default Home;
