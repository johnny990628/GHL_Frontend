import React from 'react'
import { Box } from '@mui/material'
import { Scrollbars } from 'react-custom-scrollbars'
import useStyles from './Style'

const CustomScrollbar = ({ children, onScroll }) => {
    const classes = useStyles()

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={500}
            autoHideDuration={500}
            renderThumbVertical={props => <Box {...props} className={classes.scrollbar} />}
            renderThumbHorizontal={props => <Box {...props} className={classes.scrollbar} />}
            onScroll={onScroll}
        >
            {children}
        </Scrollbars>
    )
}

export default CustomScrollbar
