import React, { useState, useEffect, useMemo } from 'react'
import {
    Box,
    Tabs,
    Tab,
    ToggleButton,
    useMediaQuery,
    Grid,
    Chip,
    IconButton,
    Button,
    Stack,
    CircularProgress,
    Tooltip,
    Badge,
    Popover,
    Popper,
} from '@mui/material'
import { useTheme } from '@mui/styles'
import Scrollspy from 'react-scrollspy'
import { useDebouncedCallback } from 'use-debounce'
import useStyles from './Style'

import CustomReportInput from './CustomReportInput'
import CustomScrollbar from '../../Components/CustomScrollbar/CustomScrollbar'
import { useDispatch, useSelector } from 'react-redux'
import { addCancer, clearCancer } from '../../Redux/Slices/ReportForm'
import ReportList from './ReportList'
import { Cast, CloudDone, History, Mic } from '@mui/icons-material'
import useSpeech2Text from '../../Hooks/useSpeech2Text'
import { apiAddWorklist } from '../../Axios/WorkList'
import { openAlert } from '../../Redux/Slices/Alert'

const FormSection = ({ list }) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const report = useSelector(state => state.reportForm[list.name])

    const setupNormal = () => {
        return report?.length === 0
    }

    const setupValue = ({ row }) => {
        return report?.find(d => d.name === row.name)
    }

    return (
        <Box id={list.name} className={classes.formContainer}>
            <ToggleButton
                disableFocusRipple
                disableRipple
                color="primary"
                value="check"
                selected={setupNormal()}
                onClick={() => dispatch(clearCancer({ organ: list.name }))}
                className={classes.toggleButton}
            >
                <Box className={classes.formLabel}>{list.label}</Box>
            </ToggleButton>

            <Box>
                {list.cols.map(row => (
                    <CustomReportInput key={row.label} row={row} organ={list.name} input={setupValue({ row })} />
                ))}
            </Box>
        </Box>
    )
}

const CustomReportForm = ({ lists, patient }) => {
    const classes = useStyles()
    const theme = useTheme()
    const isComputer = useMediaQuery(theme.breakpoints.up('xl'))
    const dispatch = useDispatch()
    const commandList = useMemo(() => lists.map(list => list.cols).reduce((acc, col) => acc.concat(col)), [lists])

    const [audio] = useState(new Audio('./audio.mp3'))
    const [historyAnchorEl, setHistoryAnchorEl] = useState(null)
    const [dicomAnchorEl, setDicomAnchorEl] = useState(null)

    const { transcript, setRecord, listening } = useSpeech2Text()

    const speechAction = useDebouncedCallback(() => {
        // 辨識的疾病名稱，使用Regex防止疾病含有相同的字串
        const cancerOfTranscript = commandList.find(col => new RegExp(col.label).test(transcript))
        // 辨識的器官名稱
        const organOfTranscript = lists.find(list => transcript.includes(list.label))

        //如果語音含有疾病名稱
        if (!!cancerOfTranscript) {
            // 疾病的器官
            const organOfCancer = lists.find(list => list.cols.find(l => l.name === cancerOfTranscript.name))

            if (cancerOfTranscript.type === 'radio') {
                const option = cancerOfTranscript.options.find(option => transcript.includes(option.label))
                if (option) {
                    dispatch(
                        addCancer({
                            organ: organOfCancer.name,
                            name: cancerOfTranscript.name,
                            type: cancerOfTranscript.type,
                            value: [option.value],
                        })
                    )
                    audio.play()
                }
            }

            if (cancerOfTranscript.type === 'checkbox') {
                dispatch(
                    addCancer({
                        organ: organOfCancer.name,
                        name: cancerOfTranscript.name,
                        type: cancerOfTranscript.tㄓype,
                        value: true,
                    })
                )
                audio.play()
            }
        }

        //如果語音含有器官名稱
        if (!!organOfTranscript) {
            // 清除器官
            if (transcript.includes('清除')) dispatch(clearCancer({ organ: organOfTranscript.name, name: organOfTranscript.name }))
            // 新增備註
            else
                dispatch(
                    addCancer({
                        organ: organOfTranscript.name,
                        name: 'other',
                        type: 'text',
                        value: transcript.replace(organOfTranscript.label, ''),
                    })
                )
            audio.play()
        }
    }, 250)

    useEffect(() => {
        speechAction()
    }, [transcript])

    const [tabIndex, setTabIndex] = useState(0)
    const tabOnClick = ({ index, id }) => {
        setTabIndex(index)
        window.document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    }
    const [toolkitOpen, setToolkitOpen] = useState(false)
    const handleRecordClick = e => {
        setRecord(s => !s)
        setToolkitOpen(b => !b)
    }

    const handleHistoryClick = event => {
        setHistoryAnchorEl(event.currentTarget)
    }

    const handleDicomClick = event => {
        setDicomAnchorEl(dicom => (dicom ? null : event.currentTarget))
    }

    const onScrollEvent = useDebouncedCallback(event => {
        let index = Math.floor(event.target.scrollTop / 100)
        index = index < lists.length - 1 ? index : lists.length - 1
        setTabIndex(index)
    }, 100)

    const HistoryPopover = () => {
        const handleClose = () => {
            setHistoryAnchorEl(null)
        }
        return (
            <Popover
                open={Boolean(historyAnchorEl)}
                anchorEl={historyAnchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                classes={{ paper: classes.popover }}
            >
                <ReportList patient={patient} />
            </Popover>
        )
    }

    const DicomPopper = () => {
        return (
            <Popper open={Boolean(dicomAnchorEl)} anchorEl={dicomAnchorEl}>
                <iframe src={`${process.env.REACT_APP_BLUELIGHT_URL}?PatientID=${patient.id}`} style={{ height: '70vh', width: '45vw' }} />
            </Popper>
        )
    }
    // Prevent Component Rerender
    const DicomPopperCom = useMemo(() => <DicomPopper />, [dicomAnchorEl])

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 1rem', height: '5%' }}>
                <Box className={classes.patientInfo}>{`${patient.id} / ${patient.name} / ${patient.gender === 'm' ? '男' : '女'}`}</Box>

                {/* <Tooltip
                    onClose={() => setToolkitOpen(false)}
                    open={toolkitOpen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={transcript}
                >
                    <Button
                        variant={listening ? 'outlined' : 'contained'}
                        onClick={handleRecordClick}
                        startIcon={listening ? <CircularProgress size={20} /> : <Mic />}
                        sx={{ borderRadius: '2rem', height: 'auto' }}
                    >
                        {listening ? '辨識中' : '語音辨識'}
                    </Button>
                </Tooltip> */}
                <Stack direction="row" spacing={1}>
                    {/* <Button
                        variant="contained"
                        onClick={() => {
                            apiAddWorklist(patient.id)
                                .then(res =>
                                    dispatch(
                                        openAlert({
                                            toastTitle: '開單成功',
                                            text: `新增workList ${res.data.name}`,
                                            icon: 'success',
                                        })
                                    )
                                )
                                .catch(err =>
                                    dispatch(
                                        openAlert({
                                            toastTitle: '開單失敗',
                                            text: err.response.data.message,
                                            icon: 'error',
                                        })
                                    )
                                )
                        }}
                        startIcon={<CloudDone />}
                        color="primary"
                        sx={{ borderRadius: '2rem', height: 'auto', color: 'white' }}
                    >
                        超音波開單
                    </Button> */}
                    <Button
                        variant={Boolean(dicomAnchorEl) ? 'outlined' : 'contained'}
                        onClick={handleDicomClick}
                        startIcon={Boolean(dicomAnchorEl) ? <CircularProgress color="contrast" size={20} /> : <Cast />}
                        color="contrast"
                        sx={{ borderRadius: '2rem', height: 'auto', color: Boolean(dicomAnchorEl) ? 'contrast.main' : 'white' }}
                    >
                        超音波影像
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            window.open(`${process.env.REACT_APP_BLUELIGHT_URL}?PatientID=${patient.id}`, '_blank').focus()
                        }}
                        startIcon={<Cast />}
                        color="contrast"
                        sx={{ borderRadius: '2rem', height: 'auto', color: 'contrast.main' }}
                    >
                        新分頁開啟影像
                    </Button>
                </Stack>

                {/* <Badge badgeContent={patient?.report?.records.length ? patient?.report?.records.length - 1 : 0} color="primary">
                        <IconButton onClick={handleHistoryClick}>
                            <History />
                        </IconButton>
                    </Badge> */}

                <HistoryPopover />
                {DicomPopperCom}
            </Box>

            <Box className={classes.container}>
                {isComputer && (
                    <Scrollspy items={lists.map(list => list.name)} className={classes.scrollspy}>
                        <Tabs value={tabIndex} orientation="vertical">
                            {lists.map((list, index) => (
                                <Tab
                                    key={list.name}
                                    label={list.label}
                                    disableRipple
                                    component="a"
                                    className={classes.scrollspyButton}
                                    onClick={() => tabOnClick({ index, id: list.name })}
                                />
                            ))}
                        </Tabs>
                    </Scrollspy>
                )}

                <Grid container sx={{ height: '100%' }} spacing={2}>
                    <Grid item xs={12} xl={10}>
                        <Box sx={{ height: '68vh', overflowY: 'auto' }}>
                            {lists.map(list => (
                                <FormSection key={list.name} list={list} />
                            ))}
                        </Box>
                    </Grid>
                    {/* {isComputer && (
                        <Grid item xs={2}>
                            <CustomScrollbar>
                                <Box className={classes.formLabel}>歷史報告</Box>
                                <ReportList patient={patient} />
                            </CustomScrollbar>
                        </Grid>
                    )} */}
                </Grid>
            </Box>
        </>
    )
}

export default CustomReportForm
