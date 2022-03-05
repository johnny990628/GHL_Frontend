import React from 'react';
import { Grid, Box } from '@mui/material';
import Progressbar from '../../Components/Progressbar/Progressbar';
import useStyles from './Style';
import LittleTable from '../../Components/LittleTable/LittleTable';

const Home = () => {
    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item md={12} xl={8} spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={6} lg={4}>
                        <Box className={classes.box}>
                            <LittleCard title={'已完成'} value={60} />
                        </Box>
                    </Grid>
                    <Grid item xs={6} lg={4}>
                        <Box className={classes.box}>
                            <LittleCard title={'未完成'} value={80} />
                        </Box>
                    </Grid>
                    <Grid item xs={6} lg={4}>
                        <Box className={classes.box}>
                            <LittleCard title={'總人數'} value={140} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.box}>
                            <LittleTable title={'目前報告'} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={12} xl={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
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
            <Box className={classes.cardHeader}>
                <Progressbar value={value} />
            </Box>
            <Box className={classes.cardBody}>
                <Box className={classes.cardTopic}>{title}</Box>
            </Box>
        </Box>
    );
};
export default Home;
