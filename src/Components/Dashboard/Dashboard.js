import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer } from '@mui/material'

import useStyles from './Style'
import LittleTable from '../LittleTable/LittleTable'
import { closeDashboard } from '../../Redux/Slices/Dashboard'

const Dashboard = () => {
    const { isOpen } = useSelector(state => state.dashboard)
    const { data } = useSelector(state => state.patients)
    const dispatch = useDispatch()
    const classes = useStyles()

    return (
        <Drawer
            anchor={'right'}
            variant="temporary"
            transitionDuration={{ enter: 500, exit: 500 }}
            open={isOpen}
            onClose={() => dispatch(closeDashboard())}
            classes={{ paper: classes.container }}
        >
            <LittleTable title={'尚未檢查'} rows={data.filter(d => d.processing)} route={'/createReport'} />
            <LittleTable title={'病患名單'} rows={data} route={'/patient'} />
        </Drawer>
    )
}

export default Dashboard
