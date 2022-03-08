import React, { useMemo } from 'react'
import { Box, Grid } from '@mui/material'

import useStyles from './Style'
import CustomTable from '../../Components/CustomTable/CustomTable'
import CustomForm from '../../Components/CustomForm/CustomForm'

import { useDispatch, useSelector } from 'react-redux'
import { removePatient } from '../../Redux/Slices/Patient'

const Patient = () => {
    const classes = useStyles()
    // const { data, loading } = useSelector(state => state.patients)
    const { data } = useSelector(state => state.patients)
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(fetchPatients());
    // }, []);

    const columns = useMemo(
        () => [
            { accessor: 'id', Header: '身分證字號' },
            { accessor: 'name', Header: '姓名' },
            { accessor: 'gender', Header: '性別' },
            { accessor: 'birth', Header: '生日' },
            { accessor: 'phone', Header: '電話' },
            { accessor: 'department', Header: '部門單位' },
            { accessor: 'address', Header: '地址' },
            { accessor: 'updateTime', Header: '更新日期' },
        ],
        []
    )

    return (
        <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12}>
                <CustomForm />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CustomTable data={data} columns={columns} deleteAction={removePatient} />
            </Grid>
        </Grid>
    )
}

export default Patient
