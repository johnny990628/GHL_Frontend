import React, { useEffect, useMemo, useState } from 'react'
import {
    Grid,
    Box,
    Card,
    CardContent,
    Typography,
    Popover,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    ToggleButton,
    ToggleButtonGroup,
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
} from 'recharts'
import { useTheme } from '@mui/material/styles'
import { fetchStatistic } from '../../Redux/Slices/Statistic'
import CustomScrollbar from './../../Components/CustomScrollbar/CustomScrollbar'

const Statistic = () => {
    const [selectDepartment, setSelectDepartment] = useState('all')
    const [chartType, setChartType] = useState('bar')
    const [organActiveName, setOrganActiveName] = useState('')
    const [pieActiveIndex, setPieActiveIndex] = useState(0)

    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useTheme()
    const { departments } = useSelector(state => state.statistic)

    useEffect(() => {
        if (selectDepartment === 'all') {
        }
    }, [selectDepartment])
    useEffect(() => {
        dispatch(fetchStatistic())
    }, [])

    const numsOfPeople = [
        {
            name: '超音波檢查總人數',
            label: '超音波檢查總人數',
            amount: 4000,
        },
        {
            name: '預約總人數',
            label: '預約總人數',
            amount: 3000,
        },
        {
            name: '未報到人數',
            label: '未報到人數',
            amount: 1000,
        },
    ]

    const numsOfReport = [
        {
            name: '肝臟異常',
            label: '肝臟異常',
            amount: 2780,
        },
        {
            name: '膽囊異常',
            label: '膽囊異常',
            amount: 1894,
        },
        {
            name: '腎臟異常',
            label: '腎臟異常',
            amount: 1894,
        },
        {
            name: '胰臟異常',
            label: '胰臟異常',
            amount: 432,
        },
        {
            name: '脾臟異常',
            label: '脾臟異常',
            amount: 542,
        },
        {
            name: '需進一步檢查',
            label: '需進一步檢查',
            amount: 1072,
        },
    ]

    const numsOfCancer = [
        {
            name: '肝硬化',
            label: '肝硬化',
            value: 40,
        },
        {
            name: '肝病變',
            label: '肝病變',
            value: 20,
        },
        {
            name: '肝囊腫',
            label: '肝囊腫',
            value: 40,
        },
    ]

    const renderActiveShape = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
        name,
    }) => {
        const RADIAN = Math.PI / 180
        const sin = Math.sin(-RADIAN * midAngle)
        const cos = Math.cos(-RADIAN * midAngle)
        const sx = cx + (outerRadius + 10) * cos
        const sy = cy + (outerRadius + 10) * sin
        const mx = cx + (outerRadius + 30) * cos
        const my = cy + (outerRadius + 30) * sin
        const ex = mx + (cos >= 0 ? 1 : -1) * 22
        const ey = my
        const textAnchor = cos >= 0 ? 'start' : 'end'

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
                    {`${name} ${value}人`}
                </text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        )
    }

    const handleSelectDepartment = e => {
        setSelectDepartment(e.target.value)
    }

    const handleCardClick = name => {
        setOrganActiveName(name)
    }

    return (
        <Box className={classes.container}>
            <CustomScrollbar>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>
                        統計數據
                    </Typography>
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

                <Grid container sx={{ width: '96%', height: '50%' }}>
                    {[numsOfPeople, numsOfReport].map(data => {
                        return (
                            <Grid item xs={6}>
                                {chartType === 'bar' && (
                                    <ResponsiveContainer>
                                        <BarChart
                                            data={data}
                                            margin={{
                                                top: 60,
                                                right: 50,
                                                left: 40,
                                                bottom: 20,
                                            }}
                                            barSize={40}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="amount" fill={theme.palette.primary.light_secondary} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                                {chartType === 'radar' && (
                                    <ResponsiveContainer>
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="name" />
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

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, mr: 3 }}>
                    <FormControl value={chartType} onChange={e => console.log(e.target.value)}>
                        <ToggleButtonGroup color="primary" exclusive value={chartType} onChange={e => setChartType(e.target.value)}>
                            <ToggleButton value="bar">長條圖</ToggleButton>
                            <ToggleButton value="radar">雷達圖</ToggleButton>
                        </ToggleButtonGroup>
                    </FormControl>
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
                        {organActiveName && (
                            <PieChart width={700} height={400}>
                                <Pie
                                    activeIndex={pieActiveIndex}
                                    activeShape={renderActiveShape}
                                    data={numsOfCancer}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill={theme.palette.primary.main}
                                    dataKey="value"
                                    onMouseEnter={(_, index) => setPieActiveIndex(index)}
                                />
                            </PieChart>
                        )}
                    </Grid>
                </Grid>
            </CustomScrollbar>
        </Box>
    )
}

export default Statistic
