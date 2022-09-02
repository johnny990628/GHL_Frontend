import React, { useEffect, useMemo, useState } from 'react'
import {
    Grid,
    Box,
    Card,
    CardContent,
    Typography,
    Dialog,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ToggleButton,
    ToggleButtonGroup,
    TextField,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
} from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Style'
import {
    BarChart,
    Bar,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    PieChart,
    Pie,
    Sector,
    Label,
} from 'recharts'
import { useTheme } from '@mui/material/styles'
import { fetchStatistic } from '../../Redux/Slices/Statistic'
import CustomScrollbar from './../../Components/CustomScrollbar/CustomScrollbar'
import { DayPicker } from 'react-day-picker'
import { zhTW } from 'date-fns/locale'
import { format, parse, isValid, isAfter, isBefore } from 'date-fns'
import { fetchDepartment } from './../../Redux/Slices/Statistic'

const Statistic = () => {
    const [selectDepartment, setSelectDepartment] = useState('all')
    const [chartType, setChartType] = useState('bar')
    const [organActiveName, setOrganActiveName] = useState('')
    const [open, setOpen] = useState(false)
    const [pickerMode, setPickerMode] = useState('all')
    const [date, setDate] = useState(new Date())
    const [rangeDateFrom, setRangeDateFrom] = useState('')
    const [rangeDateTo, setRangeDateTo] = useState('')

    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useTheme()
    const { departments, numsOfPeople, numsOfReport } = useSelector(state => state.statistic)

    useEffect(() => {
        if (selectDepartment === 'all') {
            dispatch(fetchStatistic())
        } else {
            dispatch(fetchStatistic(selectDepartment))
        }
    }, [selectDepartment])

    useEffect(() => {
        if (organActiveName) setChartType('bar')
    }, [organActiveName])

    useEffect(() => {
        dispatch(fetchDepartment())
    }, [])

    // const numsOfPeople = [
    //     {
    //         name: '超音波檢查總次數',
    //         label: '超音波檢查總次數',
    //         amount: 4000,
    //     },
    //     {
    //         name: '預約總人數',
    //         label: '預約總人數',
    //         amount: 3000,
    //     },
    //     {
    //         name: '未報到人數',
    //         label: '未報到人數',
    //         amount: 1000,
    //     },
    // ]

    // const numsOfReport = [
    //     {
    //         name: 'liver',
    //         label: '肝臟異常',
    //         amount: 2780,
    //         FLD: {
    //             name: 'FLD',
    //             label: '脂肪肝',
    //             value: 275,
    //         },
    //         SLPL: {
    //             name: 'SLPL',
    //             label: '疑似肝實質病變',
    //             value: 275,
    //         },
    //         LPL: { name: 'LPL', label: '肝實質病變', value: 200 },
    //         LC: {
    //             name: 'LC',
    //             label: '肝硬化',
    //             value: 231,
    //         },
    //         PLD: {
    //             name: 'PLD',
    //             label: '肝囊腫',
    //             value: 400,
    //         },
    //         HEM: {
    //             name: 'HEM',
    //             label: '血管瘤',
    //             value: 275,
    //         },
    //         IC: {
    //             name: 'IC',
    //             label: '肝內鈣化點',
    //             value: 275,
    //         },
    //         HEP: {
    //             name: 'HEP',
    //             label: '肝腫瘤(疑似肝癌)',
    //             value: 736,
    //         },
    //         HEPU: {
    //             name: 'HEPU',
    //             label: '肝腫瘤(性質不明)',
    //             value: 345,
    //         },
    //     },
    //     {
    //         name: 'gallbladder',
    //         label: '膽囊異常',
    //         amount: 1894,
    //         CL: {
    //             name: 'CL',
    //             label: '膽結石',
    //             value: 432,
    //         },
    //         GP: {
    //             name: 'GP',
    //             label: '膽息肉',
    //             value: 542,
    //         },
    //     },
    //     {
    //         name: 'kidney',
    //         label: '腎臟異常',
    //         amount: 1894,
    //         KS: {
    //             name: 'KS',
    //             label: '腎結石',
    //             value: 388,
    //         },
    //     },
    //     {
    //         name: 'pancreas',
    //         label: '胰臟異常',
    //         amount: 432,
    //         other: {
    //             name: 'other',
    //             label: '其他',
    //             value: 388,
    //         },
    //     },
    //     {
    //         name: 'spleen',
    //         label: '脾臟異常',
    //         amount: 542,
    //         ES: {
    //             name: 'ES',
    //             label: '脾臟腫大',
    //             value: 223,
    //         },
    //     },
    //     {
    //         name: 'suggestion',
    //         label: '需進一步檢查',
    //         amount: 1072,
    //     },
    // ]

    const COLORS = ['#F896D8', '#CEA2AC', '#CA7DF9', '#724CF9', '#ED7D3A', '#52D1DC', '#475B5A', '#A3A9AA', '#8CD867', '#F1AB86']
    const handleSelectDepartment = e => {
        setSelectDepartment(e.target.value)
    }

    const handleCardClick = name => {
        organActiveName === name ? setOrganActiveName('') : setOrganActiveName(name)
    }

    const handleDateSelect = range => {
        setDate(range)
        if (range?.from) {
            setRangeDateFrom(format(range.from, 'y-MM-dd'))
        } else {
            setRangeDateFrom('')
        }
        if (range?.to) {
            setRangeDateTo(format(range.to, 'y-MM-dd'))
        } else {
            setRangeDateTo('')
        }
    }

    const handleFromChange = e => {
        setRangeDateFrom(e.target.value)
        const today = parse(e.target.value, 'y-MM-dd', new Date())
        if (!isValid(date)) {
            return setDate({ from: undefined, to: undefined })
        }
        if (date?.to && isAfter(today, date.to)) {
            setDate({ from: date.to, to: date })
        } else {
            setDate({ from: today, to: date?.to })
        }
    }

    const handleToChange = e => {
        setRangeDateTo(e.target.value)
        const today = parse(e.target.value, 'y-MM-dd', new Date())

        if (!isValid(date)) {
            return setDate({ from: date?.from, to: undefined })
        }
        if (date?.from && isBefore(today, date.from)) {
            setDate({ from: today, to: date.from })
        } else {
            setDate({ from: date?.from, to: today })
        }
    }

    const resetDateState = () => {
        setDate(new Date())
        setRangeDateFrom('')
        setRangeDateTo('')
    }

    const handlePickerMode = e => {
        resetDateState()
        setPickerMode(e.target.value)
    }

    const handleDialogClose = () => {
        setOpen(false)
        // resetDateState()
    }

    const inputDateValue = () => {
        switch (pickerMode) {
            case 'all':
                return ''
            case 'single':
                return isValid(date) && format(date, 'y-MM-dd')
            case 'range':
                if (rangeDateFrom && rangeDateTo) {
                    return `${rangeDateFrom} 到 ${rangeDateTo}`
                } else {
                    return isValid(date) ? format(date, 'y-MM-dd') : ''
                }
            default:
                return ''
        }
    }

    return (
        <Box className={classes.container}>
            <CustomScrollbar>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>
                        統計數據
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <ToggleButtonGroup color="primary" value={pickerMode} onChange={handlePickerMode} sx={{ mr: 2 }}>
                            <ToggleButton value="all" key="all">
                                全部
                            </ToggleButton>
                            <ToggleButton value="single" key="single">
                                單日
                            </ToggleButton>
                            <ToggleButton value="range" key="range">
                                範圍
                            </ToggleButton>
                        </ToggleButtonGroup>
                        {pickerMode !== 'all' && (
                            <TextField
                                variant="standard"
                                placeholder="請選擇日期"
                                value={inputDateValue()}
                                sx={{ minWidth: 220, mr: 2 }}
                                onClick={() => setOpen(true)}
                            >
                                選擇日期
                            </TextField>
                        )}

                        <FormControl variant="standard" sx={{ minWidth: 120 }}>
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
                </Box>

                <Grid container wrap="nowrap">
                    <Grid container item xs={6} spacing={2} sx={{ m: 2 }}>
                        {numsOfPeople.map(d => (
                            <Grid item xs={4} key={d.name}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography fontSize={{ xs: 20, md: 24 }} color="text.secondary" gutterBottom>
                                            {d.label}
                                        </Typography>
                                        <Typography fontSize={{ xs: 26, md: 30 }}>{d.amount}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid container item xs={5} spacing={2} sx={{ m: 2 }}>
                        {numsOfReport.map(d => (
                            <Grid item xs={4} key={d.name}>
                                <Card
                                    className={`${classes.card} ${d.name === organActiveName && 'active'}`}
                                    onClick={() => handleCardClick(d.name)}
                                >
                                    <CardContent>
                                        <Typography fontSize={{ xs: 20, md: 24 }} color="text.secondary" gutterBottom>
                                            {d.label}
                                        </Typography>

                                        <Typography fontSize={{ xs: 26, md: 30 }}>{d.amount}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, mr: 3 }}>
                    <ToggleButtonGroup color="primary" exclusive value={chartType} onChange={e => setChartType(e.target.value)}>
                        <ToggleButton value="bar">長條圖</ToggleButton>
                        <ToggleButton value="radar">雷達圖</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Grid container sx={{ width: '96%', height: '40%' }}>
                    {[numsOfPeople, numsOfReport].map((data, index) => {
                        return (
                            <Grid item xs={6}>
                                {chartType === 'bar' && (
                                    <ResponsiveContainer>
                                        <BarChart
                                            data={data}
                                            margin={{
                                                top: 30,
                                                right: 50,
                                                left: 40,
                                                bottom: 40,
                                            }}
                                            barSize={40}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="label" />

                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="amount" fill={theme.palette.primary.light_secondary} />
                                            {organActiveName &&
                                                index === 1 &&
                                                Object.values(numsOfReport.find(d => d.name === organActiveName))
                                                    .filter(value => typeof value === 'object')
                                                    .map((child, index) => (
                                                        <Bar
                                                            key={child.name}
                                                            dataKey={`${child.name}.value`}
                                                            // stackId="a"
                                                            name={child.label}
                                                            fill={COLORS[index % COLORS.length]}
                                                        />
                                                    ))}

                                            <Legend />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                                {chartType === 'radar' && (
                                    <ResponsiveContainer>
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="label" />
                                            <PolarRadiusAxis />
                                            <Radar
                                                name="Mike"
                                                dataKey="amount"
                                                stroke={theme.palette.primary.main}
                                                fill={theme.palette.primary.light_secondary}
                                                fillOpacity={0.6}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                )}
                            </Grid>
                        )
                    })}
                </Grid>
            </CustomScrollbar>

            <Dialog open={open} onClose={handleDialogClose}>
                <DialogContent>
                    <DayPicker
                        mode={pickerMode}
                        selected={date}
                        onSelect={handleDateSelect}
                        fromYear={1930}
                        toYear={new Date().getFullYear()}
                        captionLayout="dropdown"
                        locale={zhTW}
                        footer={
                            <>
                                {pickerMode === 'single' ? (
                                    <TextField
                                        fullWidth
                                        value={format(date, 'y-MM-dd')}
                                        onChange={handleDateSelect}
                                        sx={{ mt: 2 }}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                ) : (
                                    <Box>
                                        <TextField
                                            fullWidth
                                            placeholder="開始"
                                            value={rangeDateFrom}
                                            onChange={handleFromChange}
                                            sx={{ mb: 2, mt: 2 }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            placeholder="結束"
                                            value={rangeDateTo}
                                            onChange={handleToChange}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Box>
                                )}
                            </>
                        }
                    />
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleDialogClose}>
                        儲存
                    </Button>
                    <Button onClick={handleDialogClose} autoFocus>
                        取消
                    </Button>
                </DialogActions> */}
            </Dialog>
        </Box>
    )
}

export default Statistic
