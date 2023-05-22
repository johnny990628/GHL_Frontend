import React, { useEffect, useMemo, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControlLabel, FormGroup, IconButton, Switch } from '@mui/material'
import {
    AccessTime,
    AirlineSeatIndividualSuite,
    ArrowDropDown,
    ArrowForwardIos,
    CalendarToday,
    Check,
    CheckBox,
    CheckBoxOutlineBlank,
    Close,
    CloudDone,
    Delete,
    Edit,
    Visibility,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './Style'

import CustomTable from '../../Components/CustomTable/CustomTable'
import GlobalFilter from '../../Components/GlobalFilter/GlobalFilter'

import { openAlert } from '../../Redux/Slices/Alert'
import { removeSchedule } from '../../Redux/Slices/Schedule'
import { activeEvent, createEvent, deleteEvent, fetchEvent } from '../../Redux/Slices/Event'
import CustomInput from '../../Components/CustomForm/CustomInput'
import { useDebouncedCallback } from 'use-debounce'
import { openDialog } from '../../Redux/Slices/Dialog'
import CustomDialog from '../../Components/CustomDialog/CustomDialog'

const Event = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const { results, count, page, loading } = useSelector(state => state.event)

    const fetchData = async params => {
        dispatch(fetchEvent(params))
    }

    const handleDeleteEvent = event =>
        dispatch(
            openAlert({
                alertTitle: '確定刪除?將會刪除所有活動資料',
                toastTitle: '刪除成功',
                text: `${event.name}`,
                icon: 'success',
                type: 'confirm',
                event: () => dispatch(deleteEvent(event._id)),
            })
        )

    const columns = useMemo(
        () => [
            {
                accessor: 'name',
                Header: '活動名稱',
                Cell: row => <Box sx={{ fontSize: '1.3rem' }}>{row.row.original.name}</Box>,
            },
            {
                accessor: 'dateTime',
                Header: '活動日期',
                Cell: row => (
                    <Box>
                        <Box>{new Date(row.row.original.datetime).toLocaleDateString()}</Box>
                    </Box>
                ),
            },
            {
                accessor: 'actions',
                Header: '操作',
                Cell: row => (
                    <Button
                        startIcon={<Edit color="contrast" />}
                        sx={{ fontSize: '1.1rem', color: 'contrast.main' }}
                        onClick={() => {
                            dispatch(openDialog({ row: row.row.original, type: 'event', mode: 'edit' }))
                        }}
                    >
                        編輯
                    </Button>
                ),
            },
            {
                accessor: 'createdAt',
                Header: '創建時間',
                Cell: row => (
                    <Box>
                        <Box>{new Date(row.row.original.updatedAt).toLocaleDateString()}</Box>
                        <Box sx={{ fontSize: '.8rem', color: 'gray.main' }}>
                            {new Date(row.row.original.updatedAt).toLocaleTimeString()}
                        </Box>
                    </Box>
                ),
            },
            {
                accessor: 'active',
                Header: '啟用',
                Cell: row => {
                    const { _id, active } = row.row.original
                    return <Switch checked={active} onChange={e => dispatch(activeEvent({ eventID: _id, active: e.target.checked }))} />
                },
            },
        ],
        []
    )

    return (
        <Box className={classes.container}>
            <CustomTable
                columns={columns}
                fetchData={fetchData}
                data={results}
                loading={loading}
                totalPage={page}
                totalCount={count}
                GlobalFilter={GlobalFilter}
            />
        </Box>
    )
}

export default Event
