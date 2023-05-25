import React from 'react'
import { Box, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import { Link } from 'react-router-dom'
import useStyles from './Style'

const LittleTable = ({ title, rows, cols, route }) => {
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
                            {cols?.map(col => (
                                <TableCell key={col.accessor} className={classes.tableCell}>
                                    {col.Header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map(row => (
                            <TableRow key={row.id} className={[classes.tableRow, classes.link]} component={Link} to={route}>
                                {cols.map(col => (
                                    <TableCell key={col.accessor} component="th" scope="row" className={classes.tableCell}>
                                        {col.type === 'text' && row[col.accessor]}
                                        {col.type === 'datetime' && (
                                            <Box>
                                                <Box>{new Date(row[col.accessor]).toLocaleDateString()}</Box>
                                                <Box sx={{ fontSize: '.8rem', color: 'gray.main' }}>
                                                    {new Date(row[col.accessor]).toLocaleTimeString()}
                                                </Box>
                                            </Box>
                                        )}
                                    </TableCell>
                                ))}
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
