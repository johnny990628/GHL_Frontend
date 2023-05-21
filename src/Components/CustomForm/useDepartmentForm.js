import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useDebouncedCallback } from 'use-debounce'

import { createDepartment, updateDepartment } from '../../Redux/Slices/Department'
import { closeDialog } from '../../Redux/Slices/Dialog'
import { openAlert } from '../../Redux/Slices/Alert'

const useDepartmentForm = () => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [errorField, setErrorField] = useState([])

    const { user } = useSelector(state => state.auth)
    const { departments } = useSelector(state => state.department4List)
    const { row } = useSelector(state => state.dialog.department)

    const dispatch = useDispatch()

    const hasEmptyField = () => {
        const errorFieldList = Object.entries({ name, address })
            .map(([key, value]) => !value && key)
            .filter(key => key)
        setErrorField(errorFieldList)
        return errorFieldList.length !== 0
    }

    const handleHelperText = fieldName => {
        switch (fieldName) {
            case 'name':
                return departments.find(d => d.name === name) && '此部門已存在'
            default:
                return ''
        }
    }

    const handleChange = useDebouncedCallback((value, name) => {
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'address':
                setAddress(value)
                break

            default:
                break
        }
    }, 500)

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
        dispatch(createDepartment({ name, address, creator: user._id }))
        dispatch(closeDialog({ type: 'department' }))
    }
    const handleUpdate = async () => {
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
        dispatch(updateDepartment({ departmentID: row._id, data: { name, address } }))
        dispatch(closeDialog({ type: 'department' }))
    }

    const inputModel = [
        { name: 'name', label: '部門名稱', type: 'text', value: name, setValue: setName, required: true },
        { name: 'address', label: '部門地址', type: 'text', value: address, setValue: setAddress, required: true },
    ]

    return { inputModel, handleChange, handleSubmit, handleUpdate, handleHelperText, errorField }
}

export default useDepartmentForm
