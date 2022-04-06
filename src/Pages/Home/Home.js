import React from 'react'
import { Grid, Box } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import Progressbar from '../../Components/Progressbar/Progressbar'
import useStyles from './Style'
import LittleTable from '../../Components/LittleTable/LittleTable'

const Home = () => {
    const classes = useStyles()
    const { data } = useSelector(state => state.patients)
    return (
        <Grid container spacing={2}>
            <Grid item md={12} xl={8} spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={6} lg={4}>
                        <Box className={classes.box}>
                            <LittleCard title={'等待檢查'} value={data.filter(d => d.processing).length} total={data.length} />
                        </Box>
                    </Grid>
                    <Grid item xs={6} lg={4}>
                        <Box className={classes.box}>
                            <LittleCard title={'完成檢查'} value={data.filter(d => d.reports.length > 0).length} total={data.length} />
                        </Box>
                    </Grid>

                    <Grid item xs={6} lg={4}>
                        <Box className={classes.box}>
                            <LittleCard title={'總人數'} value={data.length} total={data.length} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.box}>
                            <LittleTable title={'目前報告'} rows={data.filter(d => d.reports.length > 0)} route={'/report'} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={12} xl={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box className={classes.box}>
                            <LittleTable title={'尚未檢查'} rows={data.filter(d => d.processing)} route={'/createReport'} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.box}>
                            <LittleTable title={'病患名單'} rows={data} route={'/patient'} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const LittleCard = ({ title, value, total }) => {
    const classes = useStyles()

    return (
        <Box className={classes.cardContainer}>
            <Box className={classes.cardHeader}>
                <Progressbar value={value} total={total} />
            </Box>
            <Box className={classes.cardBody}>
                <Box className={classes.cardTopic}>{title}</Box>
            </Box>
        </Box>
    )
}
export default Home
