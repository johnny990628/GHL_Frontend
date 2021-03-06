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
import { Cast, History, Mic } from '@mui/icons-material'
import useSpeech2Text from '../../Hooks/useSpeech2Text'

const FormSection = ({ list, mode }) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const editReport = useSelector(state => state.reportForm.edit[list.name])
    const createReport = useSelector(state => state.reportForm.create[list.name])

    const setupNormal = () => {
        if (mode === 'create') {
            return createReport.length === 0
        }
        if (mode === 'edit') {
            return editReport.length === 0
        }
    }

    const setupValue = ({ row }) => {
        if (mode === 'create') {
            return createReport.find(d => d.name === row.name)
        }
        if (mode === 'edit') {
            return editReport.find(d => d.name === row.name)
        }
    }

    return (
        <Box id={list.name} className={classes.formContainer}>
            <ToggleButton
                disableFocusRipple
                disableRipple
                color="primary"
                value="check"
                selected={setupNormal()}
                onClick={() => dispatch(clearCancer({ organ: list.name, mode }))}
                className={classes.toggleButton}
            >
                <Box className={classes.formLabel}>{list.label}</Box>
            </ToggleButton>

            <Box>
                {list.cols.map(row => (
                    <CustomReportInput key={row.label} row={row} organ={list.name} input={setupValue({ row })} mode={mode} />
                ))}
            </Box>
        </Box>
    )
}

const CustomReportForm = ({ lists, patient, mode }) => {
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
        // ??????????????????????????????Regex?????????????????????????????????
        const cancerOfTranscript = commandList.find(col => new RegExp(col.label).test(transcript))
        // ?????????????????????
        const organOfTranscript = lists.find(list => transcript.includes(list.label))

        //??????????????????????????????
        if (!!cancerOfTranscript) {
            // ???????????????
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
                            mode,
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
                        type: cancerOfTranscript.t???ype,
                        value: true,
                        mode,
                    })
                )
                audio.play()
            }
        }

        //??????????????????????????????
        if (!!organOfTranscript) {
            // ????????????
            if (transcript.includes('??????')) dispatch(clearCancer({ organ: organOfTranscript.name, name: organOfTranscript.name, mode }))
            // ????????????
            else
                dispatch(
                    addCancer({
                        organ: organOfTranscript.name,
                        name: 'other',
                        type: 'text',
                        value: transcript.replace(organOfTranscript.label, ''),
                        mode,
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
                <iframe src={process.env.REACT_APP_BLUELIGHT_URL} style={{ height: '70vh', width: '45vw' }} />
            </Popper>
        )
    }
    // Prevent Component Rerender
    const DicomPopperCom = useMemo(() => <DicomPopper />, [dicomAnchorEl])

    return (
        <>
            {mode === 'create' && (
                <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', m: 1 }}>
                    <Box className={classes.patientInfo}>
                        <Chip label={`${patient.id} / ${patient.name} / ${patient.gender}`} variant="outlined" className={classes.chip} />
                    </Box>

                    <Tooltip
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
                            {listening ? '?????????' : '????????????'}
                        </Button>
                    </Tooltip>

                    <Button
                        variant={Boolean(dicomAnchorEl) ? 'outlined' : 'contained'}
                        onClick={handleDicomClick}
                        startIcon={Boolean(dicomAnchorEl) ? <CircularProgress color="contrast" size={20} /> : <Cast />}
                        color="contrast"
                        sx={{ borderRadius: '2rem', height: 'auto', color: Boolean(dicomAnchorEl) ? 'contrast.main' : 'white' }}
                    >
                        ???????????????
                    </Button>

                    {!isComputer && patient.reports.length > 1 && (
                        <Badge badgeContent={patient.reports.length - 1} color="primary">
                            <IconButton onClick={handleHistoryClick}>
                                <History />
                            </IconButton>
                        </Badge>
                    )}
                    <HistoryPopover />
                    {DicomPopperCom}
                </Stack>
            )}

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
                {mode === 'create' && (
                    <Grid container sx={{ height: '100%' }} spacing={2}>
                        <Grid item xs={12} xl={10}>
                            <CustomScrollbar>
                                {lists.map(list => (
                                    <FormSection key={list.name} list={list} mode={mode} />
                                ))}
                            </CustomScrollbar>
                        </Grid>
                        {isComputer && (
                            <Grid item xs={2}>
                                <CustomScrollbar>
                                    <Box className={classes.formLabel}>????????????</Box>
                                    <ReportList patient={patient} />
                                </CustomScrollbar>
                            </Grid>
                        )}
                    </Grid>
                )}
                {mode === 'edit' && (
                    <CustomScrollbar>
                        {lists.map(list => (
                            <FormSection key={list.name} list={list} mode={mode} />
                        ))}
                    </CustomScrollbar>
                )}
            </Box>
        </>
    )
}

export default CustomReportForm
