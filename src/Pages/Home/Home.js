import React, { useEffect, useState } from 'react';
import { Grid, Box, Drawer, Divider, IconButton, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Cancel, Done, Close } from '@mui/icons-material';
import Progressbar from '../../Components/Progressbar/Progressbar';
import useStyles from './Style';
import LittleTable from '../../Components/LittleTable/LittleTable';

const Home = () => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={8}>
                <Grid container sx={{ height: '30%', marginBottom: '1rem' }}>
                    <Grid item xs={4}>
                        <Box className={classes.box}>
                            <LittleCard title={'已完成'} value={60} />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box className={classes.box}>
                            <LittleCard title={'未完成'} value={80} />
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box className={classes.box}>
                            <LittleCard title={'總人數'} value={140} />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container sx={{ height: '40%' }}>
                    <Grid item xs={12}>
                        <Box className={classes.box}></Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid container>
                    <Grid item xs={12} sx={{ marginBottom: '1rem' }}>
                        <Box className={classes.box}>
                            <LittleTable title={'尚未檢查'} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.box}>
                            <LittleTable title={'病患名單'} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const LittleCard = ({ title, value }) => {
    const classes = useStyles();

    return (
        <Box className={classes.cardContainer}>
            <Box className={classes.cardIcon}>
                <Progressbar value={value} />
            </Box>
            <Box className={classes.cardBody}>
                <Box className={classes.cardTopic}>{title}</Box>
            </Box>
        </Box>
    );
};
export default Home;
