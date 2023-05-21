import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useDebouncedCallback } from 'use-debounce'

import { openAlert } from '../../Redux/Slices/Alert'
import { createEvent, updateEvent } from '../../Redux/Slices/Event'
import { closeDialog } from '../../Redux/Slices/Dialog'

const useEventForm = () => {
    const [name, setName] = useState('')
    const [datetime, setDatetime] = useState()
    const [department, setDepartment] = useState('')
    const [errorField, setErrorField] = useState([])

    const { user } = useSelector(state => state.auth)
    const { departments } = useSelector(state => state.department4List)
    const { row } = useSelector(state => state.dialog.event)

    const dispatch = useDispatch()

    const handleHelperText = fieldName => {
        switch (fieldName) {
            case 'name':
                return ''
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

    const handleSubmit = () => {
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

        dispatch(createEvent({ name, datetime, departmentID: department, creator: user._id }))
        dispatch(closeDialog({ type: 'event' }))
    }
    const handleUpdate = () => {
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

        dispatch(updateEvent({ eventID: row._id, data: { name, datetime, departmentID: department } }))
        dispatch(closeDialog({ type: 'event' }))
    }
    const inputModel = [
        { name: 'name', label: '活動名稱', type: 'text', value: name, setValue: setName, required: true },
        {
            name: 'departmentID',
            label: '部門',
            type: 'select',
            options: departments,
            value: department,
            setValue: setDepartment,
            required: true,
        },
        { name: 'datetime', label: '活動日期', type: 'date', value: datetime, setValue: setDatetime, required: true },
    ]

    return { inputModel, handleChange, handleSubmit, handleUpdate, handleHelperText, errorField }
}

export default useEventForm
