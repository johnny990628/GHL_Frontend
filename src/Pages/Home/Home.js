import React from 'react';
import { Box, Grid } from '@mui/material';

const Home = () => {
    return (
        <Grid container sx={{ height: '100%' }}>
            <Grid item xs={8} sx={{ backgroundColor: '#000000' }}>
                <Grid container sx={{ height: '30%' }}>
                    <Grid item xs={4} sx={{ backgroundColor: '#ffffff' }}>
                        123
                    </Grid>
                    <Grid item xs={4} sx={{ backgroundColor: '#ffffff' }}>
                        123
                    </Grid>
                    <Grid item xs={4} sx={{ backgroundColor: '#ffffff' }}>
                        123
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4} sx={{ backgroundColor: '#ffffff' }}></Grid>
        </Grid>
    );
};

export default Home;
