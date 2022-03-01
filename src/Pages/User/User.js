import React from 'react';
import { Box } from '@mui/material';
import useStyles from './Style';
import CustomTable from '../../Components/CustomTable/CustomTable';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { randomId, randomTraderName } from '@mui/x-data-grid-generator';
import { Save, Cancel, Edit, Delete } from '@mui/icons-material';

const columns = [
    { field: 'name', headerName: '用戶名', width: 250, editable: true },
    { field: 'username', headerName: '帳號', width: 250, editable: true },
    { field: 'permission', headerName: '權限', type: 'singleSelect', valueOptions: ['使用者', '管理員', '醫師'], width: 300, editable: true },
];

const rows = [
    { id: randomId(), name: randomTraderName(), username: 'xcv8787', permission: '使用者' },
    { id: randomId(), name: randomTraderName(), username: 'xcv8787', permission: '管理員' },
    { id: randomId(), name: randomTraderName(), username: 'xcv8787', permission: '醫師' },
    { id: randomId(), name: randomTraderName(), username: 'xcv8787', permission: '使用者' },
    { id: randomId(), name: randomTraderName(), username: 'xcv8787', permission: '醫師' },
    { id: randomId(), name: randomTraderName(), username: 'xcv8787', permission: '管理員' },
    { id: randomId(), name: randomTraderName(), username: 'xcv8787', permission: '管理員' },
];

const User = () => {
    const classes = useStyles();
    return <CustomTable rows={rows} columns={columns} />;
};

export default User;
