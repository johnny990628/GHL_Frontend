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
    Stack,
} from '@mui/material'

import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from '@mui/x-data-grid'

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
import ExcelJs from 'exceljs'
import { useTheme } from '@mui/material/styles'
import { Print } from '@mui/icons-material'

import { fetchStatistic } from '../../Redux/Slices/Statistic'
import CustomScrollbar from './../../Components/CustomScrollbar/CustomScrollbar'
import { DayPicker } from 'react-day-picker'
import { id, zhTW } from 'date-fns/locale'
import { format, parse, isValid, isAfter, isBefore, addDays, isMatch, parseISO } from 'date-fns'
import { fetchDepartment } from './../../Redux/Slices/Statistic'
import CustomDataGrid from './../../Components/CustomDataGrid/CustomDataGrid'
import { openAlert } from '../../Redux/Slices/Alert'

const Statistic = () => {
    const [selectDepartment, setSelectDepartment] = useState('all')
    const [chartType, setChartType] = useState('bar')
    const [organActiveName, setOrganActiveName] = useState('')
    const [peopleActiveName, setPeopleActiveName] = useState('')
    const [open, setOpen] = useState(false)
    const [pickerMode, setPickerMode] = useState('all')
    const [date, setDate] = useState(new Date())
    const [rangeDateFrom, setRangeDateFrom] = useState('')
    const [rangeDateTo, setRangeDateTo] = useState('')
    const [time, setTime] = useState('all')

    const TIMELIST = [...Array(24).keys()].flatMap((_, i) => [
        [`${('0' + i).slice(-2)}:00`, `${('0' + i).slice(-2)}:30`],
        [`${('0' + i).slice(-2)}:30`, `${('0' + (i + 1)).slice(-2)}:00`],
    ])
    const COLORS = ['#C7B8EA', '#F896D8', '#CEA2AC', '#CA7DF9', '#52D1DC', '#FF8552', '#73A6AD', '#A3A9AA', '#8CD867', '#F1AB86']

    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useTheme()
    const { departments, numsOfPeople, numsOfReport, numsOfPeopleGroupByDay, numsOfOrganGroupByDay, numsOfCancerGroupByDay } = useSelector(
        state => state.statistic
    )

    useEffect(() => {
        const departmentID = selectDepartment === 'all' ? null : selectDepartment

        const formatDate = () => {
            let dateFrom = ''
            let dateTo = ''
            if (pickerMode === 'all') {
                dateFrom = parseISO('1900-01-01')
                dateTo = addDays(new Date(), 1)
            }
            if (pickerMode === 'single') {
                if (time && time !== 'all') {
                    let [timeFrom, timeTo] = time.split(',')
                    timeFrom = timeFrom + ':00'
                    timeTo = timeTo + ':00'
                    const day = new Date(`${date}`).toLocaleDateString()
                    dateFrom = new Date(`${day} ${timeFrom}`)
                    dateTo = new Date(`${day} ${timeTo}`)
                } else {
                    dateFrom = date
                    dateTo = addDays(date, 1)
                }
            }
            if (pickerMode === 'range' && rangeDateFrom && rangeDateTo) {
                if (isMatch(rangeDateFrom, rangeDateTo)) {
                    const sameDate = new Date(rangeDateFrom)
                    dateFrom = sameDate.toLocaleDateString()
                    dateTo = new Date(addDays(sameDate, 1)).toLocaleDateString()
                } else {
                    dateFrom = parseISO(rangeDateFrom)
                    dateTo = addDays(parseISO(rangeDateTo), 1)
                }
            }

            return { dateFrom, dateTo, type: pickerMode }
        }

        const params = formatDate()

        dispatch(fetchStatistic({ departmentID, params }))
    }, [selectDepartment, pickerMode, date, time])

    useEffect(() => {
        if (organActiveName) setChartType('bar')
    }, [organActiveName])

    useEffect(() => {
        dispatch(fetchDepartment())
    }, [])

    const handleSelectDepartment = e => {
        setSelectDepartment(e.target.value)
    }

    const handleCardClick = (type, name) => {
        type === 'organ'
            ? organActiveName === name
                ? setOrganActiveName('')
                : setOrganActiveName(name)
            : peopleActiveName === name
            ? setPeopleActiveName('')
            : setPeopleActiveName(name)
    }

    const handleDateSelect = range => {
        if (isValid(range)) {
            setDate(range)
        } else if (range?.from) {
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
    }

    const handleExcelClick = () => {
        if (numsOfPeopleGroupByDay && numsOfOrganGroupByDay && numsOfCancerGroupByDay) {
            const workbook = new ExcelJs.Workbook()
            const peopleSheet = workbook.addWorksheet('性別與人數統計')
            const organSheet = workbook.addWorksheet('器官異常統計')
            const cancerSheet = workbook.addWorksheet('異常病況分類統計')
            if (pickerMode === 'single') {
                peopleSheet.addTable({
                    name: 'people',
                    ref: 'A1',
                    columns: [{ name: '日期' }, { name: '時間' }, { name: '男' }, { name: '女' }, { name: '總數' }],
                    rows: numsOfPeopleGroupByDay.map(people => [
                        people.date,
                        people.time,
                        people.male.value,
                        people.female.value,
                        people.total.value,
                    ]),
                })
                organSheet.addTable({
                    name: 'organ',
                    ref: 'A1',
                    columns: [
                        { name: '日期' },
                        { name: '時間' },
                        { name: '肝臟異常' },
                        { name: '膽囊異常' },
                        { name: '腎臟異常' },
                        { name: '胰臟異常' },
                        { name: '脾臟異常' },
                        { name: '需進一步檢查' },
                    ],
                    rows: numsOfOrganGroupByDay.map(organ => [
                        organ.date,
                        organ.time,
                        organ.liver.amount,
                        organ.gallbladder.amount,
                        organ.kidney.amount,
                        organ.pancreas.amount,
                        organ.spleen.amount,
                        organ.suggestion.amount,
                    ]),
                })
                cancerSheet.addTable({
                    name: 'cancer',
                    ref: 'A1',
                    columns: [
                        { name: '日期' },
                        { name: '時間' },
                        {
                            name: '脂肪肝',
                        },
                        {
                            name: '疑似肝實質病變',
                        },
                        { name: '肝實質病變' },
                        {
                            name: '肝硬化',
                        },
                        {
                            name: '肝囊腫',
                        },
                        {
                            name: '血管瘤',
                        },
                        {
                            name: '肝內鈣化點',
                        },
                        {
                            name: '肝腫瘤(疑似肝癌)',
                        },
                        {
                            name: '肝腫瘤(性質不明)',
                        },
                        {
                            name: '膽結石',
                        },
                        {
                            name: '膽息肉',
                        },
                        {
                            name: '腎結石',
                        },
                        {
                            name: '腎囊腫',
                        },
                        {
                            name: '腎腫瘤',
                        },
                        {
                            name: '脾臟腫大',
                        },
                        {
                            name: '請每隔幾年幾月定期追蹤一次',
                        },
                        {
                            name: '請至各大醫院近一步詳細檢查',
                        },
                    ],
                    rows: numsOfCancerGroupByDay.map(cancer => [
                        cancer.date,
                        cancer.time,
                        cancer?.FLD?.value || 0,
                        cancer?.SLPL?.value || 0,
                        cancer?.LPL?.value || 0,
                        cancer?.LC?.value || 0,
                        cancer?.PLD?.value || 0,
                        cancer?.HEM?.value || 0,
                        cancer?.IC?.value || 0,
                        cancer?.HEP?.value || 0,
                        cancer?.HEPU?.value || 0,
                        cancer?.CL?.value || 0,
                        cancer?.GP?.value || 0,
                        cancer?.KS?.value || 0,
                        cancer?.RC?.value || 0,
                        cancer?.KC?.value || 0,
                        cancer?.ES?.value || 0,
                        cancer?.datetime?.value || 0,
                        cancer?.examination?.value || 0,
                    ]),
                })
            } else {
                peopleSheet.addTable({
                    name: 'people',
                    ref: 'A1',
                    columns: [{ name: '日期' }, { name: '男' }, { name: '女' }, { name: '總數' }],
                    rows: numsOfPeopleGroupByDay.map(people => [people.date, people.male.value, people.female.value, people.total.value]),
                })
                organSheet.addTable({
                    name: 'organ',
                    ref: 'A1',
                    columns: [
                        { name: '日期' },
                        { name: '肝臟異常' },
                        { name: '膽囊異常' },
                        { name: '腎臟異常' },
                        { name: '胰臟異常' },
                        { name: '脾臟異常' },
                        { name: '需進一步檢查' },
                    ],
                    rows: numsOfOrganGroupByDay.map(organ => [
                        organ.date,
                        organ.liver.amount,
                        organ.gallbladder.amount,
                        organ.kidney.amount,
                        organ.pancreas.amount,
                        organ.spleen.amount,
                        organ.suggestion.amount,
                    ]),
                })
                cancerSheet.addTable({
                    name: 'cancer',
                    ref: 'A1',
                    columns: [
                        { name: '日期' },
                        {
                            name: '脂肪肝',
                        },
                        {
                            name: '疑似肝實質病變',
                        },
                        { name: '肝實質病變' },
                        {
                            name: '肝硬化',
                        },
                        {
                            name: '肝囊腫',
                        },
                        {
                            name: '血管瘤',
                        },
                        {
                            name: '肝內鈣化點',
                        },
                        {
                            name: '肝腫瘤(疑似肝癌)',
                        },
                        {
                            name: '肝腫瘤(性質不明)',
                        },
                        {
                            name: '膽結石',
                        },
                        {
                            name: '膽息肉',
                        },
                        {
                            name: '腎結石',
                        },
                        {
                            name: '腎囊腫',
                        },
                        {
                            name: '腎腫瘤',
                        },
                        {
                            name: '脾臟腫大',
                        },
                        {
                            name: '請每隔幾年幾月定期追蹤一次',
                        },
                        {
                            name: '請至各大醫院近一步詳細檢查',
                        },
                    ],
                    rows: numsOfCancerGroupByDay.map(cancer => [
                        cancer.date,
                        cancer?.FLD?.value || 0,
                        cancer?.SLPL?.value || 0,
                        cancer?.LPL?.value || 0,
                        cancer?.LC?.value || 0,
                        cancer?.PLD?.value || 0,
                        cancer?.HEM?.value || 0,
                        cancer?.IC?.value || 0,
                        cancer?.HEP?.value || 0,
                        cancer?.HEPU?.value || 0,
                        cancer?.CL?.value || 0,
                        cancer?.GP?.value || 0,
                        cancer?.KS?.value || 0,
                        cancer?.RC?.value || 0,
                        cancer?.KC?.value || 0,
                        cancer?.ES?.value || 0,
                        cancer?.datetime?.value || 0,
                        cancer?.examination?.value || 0,
                    ]),
                })
            }

            const genTitle = () => {
                const titleDate =
                    rangeDateTo && pickerMode !== 'all'
                        ? `${rangeDateTo.replaceAll('-', '')}-${rangeDateTo.replaceAll('-', '')}`
                        : format(date, 'y-MM-dd').replaceAll('-', '')
                const titleDepartment = selectDepartment !== 'all' ? `(${departments.find(d => d._id === selectDepartment).name})` : ''

                return titleDate + '好心肝超音波檢查報告統計報表' + titleDepartment
            }

            workbook.xlsx.writeBuffer().then(content => {
                const link = document.createElement('a')
                const blobData = new Blob([content], {
                    type: 'application/vnd.ms-excel;charset=utf-8;',
                })
                link.download = `${genTitle()}.xlsx`
                link.href = URL.createObjectURL(blobData)
                link.click()
            })
        } else {
            dispatch(
                openAlert({
                    toastTitle: '發生錯誤',
                    text: '無統計資料',
                    icon: 'error',
                })
            )
        }
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

    const columns = [
        { field: 'label', headerName: '部位異常', flex: 1 },
        { field: 'amount', headerName: '數量', flex: 1 },
    ]

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport
                    csvOptions={{ fileName: `${new Date(date).toLocaleDateString()}好心肝報告統計資料`, utf8WithBom: true }}
                    printOptions={{ hideToolbar: true, hideFooter: true }}
                />
            </GridToolbarContainer>
        )
    }

    return (
        <Box className={classes.container}>
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
                    {pickerMode === 'single' && (
                        <FormControl variant="standard" sx={{ minWidth: 120, mr: 2 }}>
                            <InputLabel id="time">時段選擇</InputLabel>
                            <Select
                                labelId="time"
                                value={time}
                                onChange={e => setTime(e.target.value)}
                                MenuProps={{ classes: { paper: classes.menu } }}
                            >
                                <MenuItem value={'all'}>整天</MenuItem>
                                {TIMELIST.map(item => (
                                    <MenuItem key={item[0]} value={item.toString()}>
                                        {`${item[0]} - ${item[1]}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                            <Card
                                className={`${classes.card} ${d.name === peopleActiveName && 'active'}`}
                                onClick={() => handleCardClick('people', d.name)}
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
                <Grid container item xs={6} spacing={2} sx={{ m: 2 }}>
                    {numsOfReport.map(d => (
                        <Grid item xs={4} key={d.name}>
                            <Card
                                className={`${classes.card} ${d.name === organActiveName && 'active'}`}
                                onClick={() => handleCardClick('organ', d.name)}
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
                    <ToggleButton value="table">表格</ToggleButton>
                </ToggleButtonGroup>
                <Button variant="text" onClick={handleExcelClick} sx={{ ml: 2 }} startIcon={<Print />}>
                    Excel
                </Button>
            </Box>

            <Grid container sx={{ width: '100%', height: '46vh' }} spacing={3} wrap="nowrap">
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
                                                .sort((a, b) => b.value - a.value)
                                                .map((child, index) => (
                                                    <Bar
                                                        key={child.name}
                                                        dataKey={`${child.name}.value`}
                                                        // stackId="a"
                                                        name={child.label}
                                                        fill={COLORS[index % COLORS.length]}
                                                    />
                                                ))}
                                        {peopleActiveName &&
                                            index === 0 &&
                                            Object.values(numsOfPeople.find(d => d.name === peopleActiveName))
                                                .filter(value => typeof value === 'object')
                                                .sort((a, b) => b.value - a.value)
                                                .map((child, index) => (
                                                    <Bar
                                                        key={child.name}
                                                        dataKey={`${child.name}.value`}
                                                        stackId="a"
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
                            {chartType === 'table' && (
                                <ResponsiveContainer>
                                    <CustomDataGrid data={data} columns={columns} getRowId={row => row.name} Toolbar={CustomToolbar} />
                                </ResponsiveContainer>
                            )}
                        </Grid>
                    )
                })}
            </Grid>

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
            </Dialog>
        </Box>
    )
}

export default Statistic
