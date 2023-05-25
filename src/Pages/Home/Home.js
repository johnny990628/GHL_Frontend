import React, { useEffect, useMemo, useState } from 'react'
import { Grid, Box, Dialog, DialogContent, useMediaQuery, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useTheme } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'

import Progressbar from '../../Components/Progressbar/Progressbar'
import useStyles from './Style'
import LittleTable from '../../Components/LittleTable/LittleTable'
import { fetchDashboard } from '../../Redux/Slices/Dashboard'
import { DayPicker } from 'react-day-picker'
import { format, isValid, addDays } from 'date-fns'
import { zhTW } from 'date-fns/locale'

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useTheme()
    const { patients, waitExaminationSchedule, finishSchedule, count } = useSelector(state => state.dashboard)
    const { departments } = useSelector(state => state.department4List)
    const isComputer = useMediaQuery(theme.breakpoints.up('xl'))
    const [selectDepartment, setSelectDepartment] = useState('all')
    const [date, setDate] = useState(new Date())
    const [datePickerDialog, setDatePickerDialog] = useState(false)

    const patientCol = useMemo(
        () => [
            { accessor: 'id', Header: '身分證字號', type: 'text' },
            { accessor: 'name', Header: '姓名', type: 'text' },
            { accessor: 'gender', Header: '性別', type: 'text' },
        ],
        []
    )
    const waitScheduleCol = useMemo(
        () => [
            { accessor: 'patientID', Header: '身分證字號', type: 'text' },
            { accessor: 'createdAt', Header: '排程時間', type: 'datetime' },
        ],
        []
    )
    const finishScheduleCol = useMemo(
        () => [
            { accessor: 'patientID', Header: '身分證字號', type: 'text' },
            { accessor: 'updatedAt', Header: '完成時間', type: 'datetime' },
        ],
        []
    )

    useEffect(() => {
        const [dateFrom, dateTo] = [date.toLocaleDateString(), new Date(addDays(date, 1)).toLocaleDateString()]
        const department = selectDepartment === 'all' ? null : selectDepartment
        dispatch(fetchDashboard({ dateFrom, dateTo, department }))
    }, [date, selectDepartment])

    const handleSelectDepartment = e => {
        setSelectDepartment(e.target.value)
    }

    const handleDateSelect = day => {
        setDate(day)
    }

    const handleDialogClose = () => {
        setDatePickerDialog(false)
    }
    return (
        <Box>
            <Grid container spacing={2}>
                {!isComputer && (
                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <Box className={classes.box}>
                                <TextField
                                    variant="standard"
                                    label="日期"
                                    value={format(date, 'y-MM-dd')}
                                    sx={{ width: '100%' }}
                                    onClick={() => setDatePickerDialog(true)}
                                ></TextField>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box className={classes.box}>
                                <FormControl variant="standard" sx={{ width: '100%' }}>
                                    <InputLabel id="department">部門選擇</InputLabel>
                                    <Select labelId="department" value={selectDepartment} onChange={handleSelectDepartment}>
                                        <MenuItem value={'all'}>全部</MenuItem>
                                        {departments &&
                                            departments.map(department => (
                                                <MenuItem key={department._id} value={department._id}>
                                                    {department.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                )}
                <Grid item md={12} xl={8} spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} lg={4}>
                            <Box className={classes.box}>
                                <LittleCard title={'尚未檢查'} value={count?.waitExamination} total={count?.patient} />
                            </Box>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <Box className={classes.box}>
                                <LittleCard title={'完成檢查'} value={count?.finish} total={count?.patient} />
                            </Box>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <Box className={classes.box}>
                                <LittleCard title={'登記病患'} value={count?.patient} total={count?.patient} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.box}>
                                <LittleTable title={'登記病患'} rows={patients} cols={patientCol} route={'/patient'} />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item md={12} xl={4} spacing={2}>
                    {/* {isComputer && (
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={6}>
                                <Box className={classes.box}>
                                    <TextField
                                        variant="standard"
                                        label="日期"
                                        value={format(date, 'y-MM-dd')}
                                        sx={{ width: '90%' }}
                                        onClick={() => setDatePickerDialog(true)}
                                    ></TextField>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box className={classes.box}>
                                    <FormControl variant="standard" sx={{ width: '90%' }}>
                                        <InputLabel id="department">部門選擇</InputLabel>
                                        <Select labelId="department" value={selectDepartment} onChange={handleSelectDepartment}>
                                            <MenuItem value={'all'}>全部</MenuItem>
                                            {departments &&
                                                departments.map(department => (
                                                    <MenuItem key={department._id} value={department._id}>
                                                        {department.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                    )} */}

                    <Grid item xs={12}>
                        <Box className={classes.box}>
                            <LittleTable title={'尚未檢查'} rows={waitExaminationSchedule} cols={waitScheduleCol} route={'/patient'} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.box}>
                            <LittleTable title={'完成檢查'} rows={finishSchedule} cols={finishScheduleCol} route={'/report'} />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Dialog open={datePickerDialog} onClose={handleDialogClose}>
                <DialogContent>
                    <DayPicker
                        mode={'single'}
                        selected={date}
                        onSelect={handleDateSelect}
                        fromYear={1930}
                        toYear={new Date().getFullYear()}
                        captionLayout="dropdown"
                        locale={zhTW}
                        footer={
                            <TextField
                                fullWidth
                                value={format(date, 'y-MM-dd')}
                                onChange={handleDateSelect}
                                sx={{ mt: 2 }}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        }
                    />
                </DialogContent>
            </Dialog>
        </Box>
    )
}

const LittleCard = ({ title, value, total }) => {
    const classes = useStyles()

    return (
        <Box className={classes.cardContainer}>
            <Box className={classes.cardHeader}>
                <Progressbar value={value} total={total} />
            </Box>
            <Box className={classes.cardBody}>
                <Box className={classes.cardTopic}>{title}</Box>
            </Box>
        </Box>
    )
}
export default Home
