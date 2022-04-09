import React, { useEffect, useState } from 'react'
import { Box, Button, FormControlLabel, FormGroup, Switch } from '@mui/material'

import { useTheme } from '@mui/styles'
import useStyles from './Style'

import { useDispatch, useSelector } from 'react-redux'
import { closeDialog } from '../../Redux/Slices/Dialog'

import { openSnackbar } from '../../Redux/Slices/Snackbar'
import QRScanner from '../QRScanner/QRScanner'
import CustomInput from './CustomInput'
import { verifyID, verifyPhone } from '../../Utils/Verify'

const CustomForm = ({ title, row, mode, handleSubmit }) => {
    const [id, setId] = useState('')
    const [blood, setBlood] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('')
    const [birth, setBirth] = useState(null)
    const [gender, setGender] = useState('女')
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
            dispatch(openSnackbar('掃描成功'))
        }
    }, [qrcode])

    const checkBloodExist = value => data.some(d => d.blood === value)
    const checkIDExist = value => data.some(d => d.id === value)

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

    const handleChange = (value, name) => {
        switch (name) {
            case 'id':
                setValidID(verifyID(value))
                setIdUsed(checkIDExist(value))
                break
            case 'phone':
                setValidPhone(verifyPhone(value))
                break
            case 'blood':
                setBloodUsed(checkBloodExist(value))
                break
            default:
                break
        }
    }

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
        const errorFieldList = Object.entries({ id, blood, name, address, phone, birth, gender })
            .map(([key, value]) => !value && key)
            .filter(key => key)
        setErrorField(errorFieldList)
        return errorFieldList.length !== 0
    }

    const inputModel = [
        { name: 'blood', label: '抽血編號', value: blood, setValue: setBlood, required: true },
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
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={() => {
                                if (hasEmptyField() || idUsed || !validID || !validPhone) return
                                handleSubmit({
                                    id,
                                    blood,
                                    name,
                                    address,
                                    phone,
                                    department,
                                    birth,
                                    gender,
                                    age,
                                    processing: autoProcessSwitch,
                                    reports: [],
                                })
                                mode === 'create' && handleDelete()
                                mode === 'edit' && dispatch(closeDialog({ type: 'patient' }))
                                mode === 'edit' && dispatch(openSnackbar('修改成功'))
                            }}
                        >
                            {mode === 'create' ? '新增' : '修改'}
                        </Button>
                        <Button
                            variant="contained"
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

                    {mode === 'create' && <QRScanner onResult={res => setQrcode(JSON.parse(res))} />}
                </Box>
            </Box>
        </Box>
    )
}

export default CustomForm
