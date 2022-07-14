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
import { Mic } from '@mui/icons-material'
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
    const isComputer = useMediaQuery(theme.breakpoints.up('lg'))
    const dispatch = useDispatch()
    const commandList = useMemo(() => lists.map(list => list.cols).reduce((acc, col) => acc.concat(col)), [lists])

    const [audio] = useState(new Audio('./audio.mp3'))
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
                        type: cancerOfTranscript.tㄓype,
                        value: true,
                        mode,
                    })
                )
                audio.play()
            }
        }

        //如果語音含有器官名稱
        if (!!organOfTranscript) {
            // 清除器官
            if (transcript.includes('清除')) dispatch(clearCancer({ organ: organOfTranscript.name, name: organOfTranscript.name, mode }))
            // 新增備註
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

    return (
        <>
            {mode === 'create' && (
                <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', m: 1 }}>
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
                            {listening ? '辨識中' : '開始辨識'}
                        </Button>
                    </Tooltip>

                    <Box className={classes.patientInfo}>
                        <Chip label={`${patient.id} / ${patient.name} / ${patient.gender}`} variant="outlined" className={classes.chip} />
                    </Box>
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
                        <Grid item xs={9} lg={10}>
                            <CustomScrollbar>
                                {lists.map(list => (
                                    <FormSection key={list.name} list={list} mode={mode} />
                                ))}
                            </CustomScrollbar>
                        </Grid>
                        <Grid item xs={3} lg={2}>
                            {patient.reports.length > 0 && <ReportList patient={patient} />}
                        </Grid>
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
