import React from 'react'
import { Box, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { Link } from 'react-router-dom'
import useStyles from './Style'

const LittleTable = ({ title, rows, route }) => {
    const classes = useStyles()

    return (
        <Box classes={{ paper: classes.container }}>
            <Box className={classes.header}>
                <Box className={classes.headerText}>{title}</Box>
            </Box>
            <Divider />
            <TableContainer sx={{ padding: '.2rem' }} className={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>身分證字號</TableCell>
                            <TableCell align="center" className={classes.tableCell}>
                                姓名
                            </TableCell>
                            <TableCell align="center" className={classes.tableCell}>
                                性別
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(0, 4).map(row => (
                            <TableRow key={row.id} className={[classes.tableRow, classes.link]} component={Link} to={route}>
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {row.id}
                                </TableCell>
                                <TableCell align="center" className={classes.tableCell}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="center" className={classes.tableCell}>
                                    {row.gender}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Link to={route} className={classes.link}>
                    <Box sx={{ padding: '1rem' }}>查看更多...</Box>
                </Link>
            </TableContainer>
        </Box>
    )
}

export default LittleTable
