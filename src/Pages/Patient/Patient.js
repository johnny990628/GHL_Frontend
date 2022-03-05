import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import useStyles from './Style';
import CustomTable from '../../Components/CustomTable/CustomTable';

import { useSelector, useDispatch } from 'react-redux';
import { fetchPatients } from '../../Redux/Slices/Patient';

const columns = [
    { field: 'id', headerName: '身分證字號', width: 150, editable: true },
    { field: 'name', headerName: '病患姓名', width: 150, editable: true },
    { field: 'birth', headerName: '生日', type: 'date', width: 150, editable: true },
    {
        field: 'time',
        type: 'date',
        headerName: '檢查日期',
        width: 150,
        editable: true,
    },
    { field: 'contact', headerName: '聯絡方式', width: 100, editable: true },
];

const Patient = () => {
    const classes = useStyles();
    const { data, loading } = useSelector((state) => state.patients);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPatients());
    }, []);

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} className={classes.table}>
                <Box className={classes.tableHeader}>新增病人</Box>
                <Form />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CustomTable data={data} columns={columns} loading={loading} />
            </Grid>
        </Grid>
    );
};

const Form = () => {
    const classes = useStyles();

    return (
        <>
            {/* <TextField
                label="姓名"
                variant="standard"
                InputProps={{
                    style: {
                        fontSize: '1.5rem',
                    },
                }}
                InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                className={classes.textField}
            />
            <TextField
                label="地址"
                variant="standard"
                InputProps={{
                    style: {
                        fontSize: '1.5rem',
                    },
                }}
                InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                className={classes.textField}
            />
            <TextField
                label="電話"
                variant="standard"
                InputProps={{
                    style: {
                        fontSize: '1.5rem',
                    },
                }}
                InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                className={classes.textField}
            />
            <TextField
                label="部門單位"
                variant="standard"
                InputProps={{
                    style: {
                        fontSize: '1.5rem',
                    },
                }}
                InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                className={classes.textField}
            />
            <TextField
                label="身分證字號"
                variant="standard"
                InputProps={{
                    style: {
                        fontSize: '1.5rem',
                    },
                }}
                InputLabelProps={{ style: { fontSize: '1.5rem' } }}
                className={classes.textField}
            /> */}

            <table border="1">
                <tr>
                    <td>姓名</td>
                    <td>
                        <input type="text" id="patient_name" />
                    </td>
                    <td>性別</td>

                    <td>
                        <select id="patient_sex">
                            <option value=""></option>
                            <option value="man">男性</option>
                            <option value="female">女性</option>
                            <option value="other">其他</option>
                        </select>
                    </td>

                    <td>出生年月日</td>
                    <td>
                        <input type="date" id="patient_birthday" name="patient_birthday" />
                    </td>

                    <td>年齡</td>
                    <td>xxxxx</td>
                </tr>
                <tr>
                    <td>地址</td>
                    <td colspan="7">
                        <input type="text" id="patient_address" />
                    </td>
                </tr>
                <tr>
                    <td>電話</td>
                    <td>(白天)</td>
                    <td>
                        <input type="text" id="patient_telephone1" />
                    </td>
                    <td>(晚間)</td>
                    <td>
                        <input type="text" id="patient_telephone2" />
                    </td>
                    <td>(手機)</td>
                    <td colspan="2">
                        <input type="text" id="patient_phone" />
                    </td>
                </tr>
                <tr>
                    <td colspan="2">部門單位</td>
                    <td colspan="2">
                        <input type="text" id="department" />
                    </td>
                    <td colspan="2">身分證字號</td>
                    <td colspan="2">
                        <input type="text" id="patient_id" />
                    </td>
                </tr>
            </table>
        </>
    );
};

export default Patient;
