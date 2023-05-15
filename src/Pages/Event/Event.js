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

const Report = () => {
    const [name, setName] = useState('')
    const [datetime, setDatetime] = useState(new Date())
    const [department, setDepartment] = useState('')
    const [errorField, setErrorField] = useState([])
    const classes = useStyles()
    const dispatch = useDispatch()

    const { results, count, page, loading } = useSelector(state => state.event)

    const fetchData = async params => {
        dispatch(fetchEvent(params))
    }

    const handleHelperText = fieldName => {
        switch (fieldName) {
            case 'name':
                return results.find(d => d.name === name) && '此活動已存在'
            default:
                return ''
        }
    }

    const hasEmptyField = () => {
        const errorFieldList = Object.entries({ name, datetime, department })
            .map(([key, value]) => !value && key)
            .filter(key => key)
        setErrorField(errorFieldList)
        return errorFieldList.length !== 0
    }

    const handleSubmit = async () => {
        if (hasEmptyField()) {
            dispatch(
                openAlert({
                    toastTitle: '新增失敗',
                    text: '有錯誤欄位',
                    icon: 'error',
                })
            )
            return
        }

        dispatch(createEvent({ name, datetime, departmentID: department }))
        setName('')
        setDatetime(new Date())
    }

    const handleChange = useDebouncedCallback((value, name) => {
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'datetime':
                setDatetime(value)
                break

            default:
                break
        }
    }, 500)

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
                        startIcon={<Delete />}
                        sx={{ color: 'red.main', fontSize: '1.1rem' }}
                        onClick={() => handleDeleteEvent(row.row.original)}
                    >
                        刪除
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

    const inputModel = [
        { name: 'name', label: '活動名稱', value: name, setValue: setName, required: true },
        { name: 'department', label: '部門', value: department, setValue: setDepartment, required: true },
        { name: 'datetime', label: '活動日期', value: datetime, setValue: setDatetime, required: true },
    ]

    return (
        <Box className={classes.container}>
            <Accordion elevation={0} className={classes.accordion}>
                <AccordionSummary expandIcon={<ArrowDropDown />} sx={{ flexDirection: 'column-reverse' }} />
                <AccordionDetails>
                    <Box className={classes.formWrapper}>
                        <Box className={classes.formHeader}>新增活動</Box>

                        <Box className={classes.formContainer}>
                            <Box className={classes.formBody}>
                                {inputModel.map(({ name, label, value, setValue, required }) => (
                                    <CustomInput
                                        key={name}
                                        name={name}
                                        label={label}
                                        value={value}
                                        setValue={setValue}
                                        handleChange={handleChange}
                                        handleHelperText={handleHelperText}
                                        error={errorField.includes(name)}
                                        required={required}
                                    />
                                ))}
                            </Box>
                            <Button
                                variant="contained"
                                className={classes.button}
                                fullWidth
                                sx={{ fontSize: '1.1rem ', padding: '.5rem', margin: '1rem' }}
                                onClick={handleSubmit}
                            >
                                新增
                            </Button>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
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

export default Report
