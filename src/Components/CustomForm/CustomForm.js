import React, { useEffect, useState } from 'react'
import { Box, Button, FormControlLabel, FormGroup, Switch } from '@mui/material'

import { useTheme } from '@mui/styles'
import useStyles from './Style'

import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'

import { closeDialog } from '../../Redux/Slices/Dialog'
import { openAlert } from '../../Redux/Slices/Alert'
import QRScanner from '../QRScanner/QRScanner'
import CustomInput from './CustomInput'
import { verifyID, verifyPhone } from '../../Utils/Verify'
import { apiCheckPatientExists } from '../../Axios/Patient'

const CustomForm = ({ title, row, mode, sendData }) => {
    const [id, setId] = useState('')
    const [blood, setBlood] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('')
    const [birth, setBirth] = useState(null)
    const [gender, setGender] = useState('男')
    const [age, setAge] = useState(0)
    const [qrcode, setQrcode] = useState(null)
    const [errorField, setErrorField] = useState([])
    const [validID, setValidID] = useState(true)
    const [validPhone, setValidPhone] = useState(true)
    const [autoProcessSwitch, setAutoProcessSwitch] = useState(true)
    const [idUsed, setIdUsed] = useState(false)
    const [bloodUsed, setBloodUsed] = useState(false)

    const classes = useStyles()
    const theme = useTheme()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.patients)

    useEffect(() => {
        if (row) {
            setId(row?.id)
            setBlood(row?.blood)
            setName(row?.name)
            setAddress(row?.address)
            setPhone(row?.phone)
            setDepartment(row?.department)
            setBirth(new Date(row.birth))
            setGender(row?.gender)
            setAge(row?.age)
        }
    }, [])

    useEffect(() => {
        //計算年紀
        if (birth) {
            const today = new Date()
            setAge(parseInt((today - birth) / 31557600000)) // 31557600000 是 24 * 3600 * 365.25 * 1000 = 一年
        }
    }, [birth])
    useEffect(() => {
        if (qrcode) {
            const { id, name, address, phone, department, birth, gender, age } = qrcode
            setId(id)
            setName(name)
            setAddress(address)
            setPhone(phone)
            setDepartment(department)
            setBirth(new Date(birth))
            setGender(row?.gender)
            setGender(gender)
            setAge(age)
            dispatch(openAlert({ message: '掃描成功', icon: 'success' }))
        }
    }, [qrcode])

    const checkBloodExist = blood => apiCheckPatientExists({ blood }).then(res => res.data)
    const checkIDExist = id => apiCheckPatientExists({ id }).then(res => res.data)

    const handleDelete = () => {
        setId('')
        setBlood('')
        setName('')
        setAddress('')
        setPhone('')
        setDepartment('')
        setBirth(null)
        setGender('女')
        setAge(0)
    }

    const handleChange = useDebouncedCallback((value, name) => {
        switch (name) {
            case 'id':
                const isValid = verifyID(value)
                setValidID(isValid)
                isValid && checkIDExist(value).then(exist => setIdUsed(exist))
                break
            case 'phone':
                setValidPhone(verifyPhone(value))
                break
            case 'blood':
                checkBloodExist(value).then(exist => setBloodUsed(exist))
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
            case 'blood':
                return bloodUsed && '此編號已存在'
            default:
                return ''
        }
    }

    const hasEmptyField = () => {
        const errorFieldList = Object.entries({ id, name, address, phone, birth, gender })
            .map(([key, value]) => !value && key)
            .filter(key => key)
        setErrorField(errorFieldList)
        return errorFieldList.length !== 0
    }

    const handleSubmit = async data => {
        try {
            if (hasEmptyField() || idUsed || !validID || !validPhone) return
            await sendData(data)
            if (mode === 'create') {
                dispatch(openAlert({ toastTitle: '新增成功', icon: 'success' }))
                handleDelete()
            }
            if (mode === 'edit') {
                dispatch(closeDialog({ type: 'patient' }))
                dispatch(
                    openAlert({
                        toastTitle: '修改成功',
                        text: `${name} ${gender === '男' ? '先生' : '小姐'}`,
                        icon: 'success',
                    })
                )
            }
        } catch (err) {
            console.log(err)
        }
    }

    const inputModel = [
        { name: 'id', label: '身分證字號', value: id, setValue: setId, required: true },
        { name: 'name', label: '姓名', value: name, setValue: setName, required: true },
        { name: 'address', label: '地址', value: address, setValue: setAddress, required: true },
        { name: 'phone', label: '電話', value: phone, setValue: setPhone, required: true },
        { name: 'department', label: '部門', value: department, setValue: setDepartment, required: false },
        { name: 'birth', label: '生日', value: birth, setValue: setBirth, required: true },
        { name: 'gender', label: '性別', value: gender, setValue: setGender, required: true },
    ]

    return (
        <Box className={classes.formWrapper}>
            <Box className={classes.formHeader}>{title}</Box>
            {mode === 'create' && (
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={autoProcessSwitch} onChange={e => setAutoProcessSwitch(e.target.checked)} />}
                        label={<Box sx={{ fontSize: '1.4rem' }}>自動加入排程</Box>}
                    />
                </FormGroup>
            )}

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
                            mode={mode}
                            required={required}
                            age={age}
                        />
                    ))}

                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '70%', alignItems: 'center' }}>
                        {mode === 'create' && <QRScanner onResult={res => setQrcode(JSON.parse(res))} />}
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() =>
                                handleSubmit({
                                    id,
                                    name,
                                    address,
                                    phone,
                                    department,
                                    birth,
                                    gender,
                                })
                            }
                        >
                            {mode === 'create' ? '新增' : '修改'}
                        </Button>
                        <Button
                            variant="text"
                            className={classes.button}
                            color="secondary"
                            sx={{
                                color: theme.palette.primary.main,

                                '&:hover': {
                                    backgroundColor: theme.palette.background.default,
                                },
                            }}
                            onClick={() => {
                                mode === 'create' && handleDelete()
                                mode === 'edit' && dispatch(closeDialog({ type: 'patient' }))
                            }}
                        >
                            {mode === 'create' ? '清除' : '取消'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CustomForm
