import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, Box, Drawer, Divider, IconButton, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Cancel, Done, Close } from '@mui/icons-material';
import useStyles from './Style';

const LittleCard = ({ title, icon }) => {
    const classes = useStyles();
    return (
        <Box className={classes.cardContainer}>
            <Box className={classes.cardIcon}>{icon}</Box>
            <Box className={classes.cardBody}>
                <Box className={classes.cardTopic}>{title}</Box>
                <Box>1000人</Box>
            </Box>
        </Box>
    );
};

const Schedule = () => {
    const createData = (id, name, gender) => {
        return { id, name, gender };
    };

    const rows = [createData('A123456789', '王曉明', '男'), createData('A121251789', '王曉明', '女'), createData('A122134789', '王曉明', '其他')];
    return (
        <TableContainer sx={{ padding: '.2rem' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>身分證字號</TableCell>
                        <TableCell align="center">姓名</TableCell>
                        <TableCell align="center">性別</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                transition: 'transform .3s ease-out',
                                '&:hover': { cursor: 'pointer', background: 'rgba(163, 64, 89,.2)', transform: 'scale(1.02)' },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.gender}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ padding: '1rem' }}>查看更多...</Box>
        </TableContainer>
    );
};

const AnotherSidebar = ({ open, setClose }) => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <Drawer anchor={'right'} variant="temporary" open={open} onClose={setClose} classes={{ paper: classes.container }}>
            <Box className={classes.header}>
                <Box className={classes.headerText}>今日檢查</Box>
                <IconButton onClick={setClose}>
                    <Close />
                </IconButton>
            </Box>
            <Divider />
            <Box className={classes.cardWrapper}>
                {[
                    { title: '已完成', icon: <Done /> },
                    { title: '未完成', icon: <Close /> },
                ].map((item) => (
                    <LittleCard title={item.title} icon={item.icon} />
                ))}
            </Box>
            <Box className={classes.header}>
                <Box className={classes.headerText}>尚未檢查</Box>
            </Box>
            <Divider />
            <Schedule />
            <Box className={classes.header}>
                <Box className={classes.headerText}>近期新增</Box>
            </Box>
            <Divider />
            <Schedule />
        </Drawer>
    );
};

export default AnotherSidebar;
