import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verifyID, verifyPhone } from '../../Utils/Verify'
import { useDebouncedCallback } from 'use-debounce'
import { apiCheckExists } from '../../Axios/Exists'
import { createPatient, updatePatient } from '../../Redux/Slices/Patient'
import { closeDialog } from '../../Redux/Slices/Dialog'
import { openAlert } from '../../Redux/Slices/Alert'
import { addSchedule } from '../../Redux/Slices/Schedule'

const usePatientForm = () => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('')
    const [birth, setBirth] = useState('')
    const [blood, setBlood] = useState('')
    const [errorField, setErrorField] = useState([])
    const [validID, setValidID] = useState(true)
    const [validPhone, setValidPhone] = useState(true)
    const [idUsed, setIdUsed] = useState(false)

    const { departments } = useSelector(state => state.department4List)
    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const checkExists = data => apiCheckExists(data).then(res => res.data)

    const handleChange = useDebouncedCallback((value, name) => {
        switch (name) {
            case 'id':
                const isValid = verifyID(value)
                setValidID(isValid)
                isValid && checkExists({ type: 'patient', value }).then(exist => setIdUsed(exist))
                break
            case 'phone':
                setValidPhone(verifyPhone(value))
                break
            default:
                break
        }
    }, 500)

    const handleHelperText = name => {
        switch (name) {
            case 'id':
                return validID ? idUsed && '此號碼已存在' : '不合法的格式'
            case 'phone':
                return validPhone || '不合法的格式'
            default:
                return ''
        }
    }

    const hasEmptyField = () => {
        const errorFieldList = Object.entries({ id, name, phone, birth })
            .map(([key, value]) => !value && key)
            .filter(key => key)
        setErrorField(errorFieldList)
        return errorFieldList.length !== 0
    }

    const handleSubmit = async () => {
        if (hasEmptyField() || idUsed || !validID || !validPhone) {
            dispatch(
                openAlert({
                    toastTitle: '新增失敗',
                    text: '有錯誤欄位',
                    icon: 'error',
                })
            )

            return
        }

        //身份證字號判斷性別
        const gender = id.substring(1, 2) === '1' ? 'm' : 'f'

        dispatch(createPatient({ id, name, phone, departmentID: department, birth, gender, creator: user._id }))
        if (blood) dispatch(addSchedule({ patientID: id, procedureCode: '19009C', blood }))

        dispatch(closeDialog({ type: 'patient' }))
    }

    const handleUpdate = () => {
        if (hasEmptyField() || idUsed || !validID || !validPhone) {
            dispatch(
                openAlert({
                    toastTitle: '新增失敗',
                    text: '有錯誤欄位',
                    icon: 'error',
                })
            )
            return
        }

        //身份證字號判斷性別
        const gender = id.substring(1, 2) === '1' ? 'm' : 'f'

        dispatch(updatePatient({ id, name, phone, departmentID: department, birth, gender }))

        dispatch(closeDialog({ type: 'patient' }))
    }

    const inputModel = [
        { name: 'blood', label: '抽血編號(非必填)', type: 'text', value: blood, setValue: setBlood, required: false },
        { name: 'id', label: '身分證字號', type: 'text', value: id, setValue: setId, required: true },
        { name: 'name', label: '姓名', type: 'text', value: name, setValue: setName, required: true },
        { name: 'phone', label: '電話', type: 'text', value: phone, setValue: setPhone, required: true },
        {
            name: 'departmentID',
            label: '部門',
            type: 'select',
            value: department,
            setValue: setDepartment,
            options: departments,
            required: false,
        },
        { name: 'birth', label: '生日', type: 'date', value: birth, setValue: setBirth, required: true },
    ]

    return { inputModel, handleChange, handleSubmit, handleUpdate, handleHelperText, errorField }
}

export default usePatientForm
