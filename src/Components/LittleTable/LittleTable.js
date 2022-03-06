import React from 'react'
import { Box, Divider, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

import useStyles from './Style'

const LittleTable = ({ title }) => {
    const classes = useStyles()
    const createData = (id, name, gender) => {
        return { id, name, gender }
    }
    const rows = [
        createData('A123456789', '王曉明', '男'),
        createData('A121251789', '王曉明', '女'),
        createData('A122134789', '王曉明', '其他'),
    ]
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
                            <TableCell sx={{ fontSize: '1.2rem' }}>身分證字號</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.2rem' }}>
                                姓名
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.2rem' }}>
                                性別
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    transition: 'transform .3s ease-out',
                                    '&:hover': { cursor: 'pointer', background: 'rgba(163, 64, 89,.2)', transform: 'scale(1.013)' },
                                }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontSize: '1.2rem' }}>
                                    {row.id}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="center" sx={{ fontSize: '1.2rem' }}>
                                    {row.gender}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box sx={{ padding: '1rem' }}>查看更多...</Box>
            </TableContainer>
        </Box>
    )
}

export default LittleTable
