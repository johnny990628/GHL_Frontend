import { useState } from 'react'
import { Select, MenuItem, InputLabel, Button, TextField, FormControl, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import { zhTW } from 'date-fns/locale' //給DatePicker用的中文月份
import QRCode from 'qrcode.react'

import { verifyID } from '../../Utils/Verify'
import { apiGetDepartments } from '../../Axios/Department'
import { useFormat } from './useFormat'

const Form = () => {
    const [userData, setUserData] = useState({})
    const [value, setValue] = useState(new Date('2000-01-01'))
    const [showQRcodeDiv, setShowQRcodeDiv] = useState(false)

    const style = {
        marginTop: '20px',
        textAlign: 'center',
    }
    const { format } = useFormat()

    const FormDiv = () => {
        return (
            <form>
                {format.map(f => {
                    if (f.formtype === 'Text') {
                        return (
                            <TextField
                                value={userData[f.name]}
                                key={f.name}
                                type={f.type}
                                id="ID"
                                label={f.label}
                                variant="outlined"
                                sx={{
                                    width: '80%',
                                    marginTop: '20px',
                                }}
                                required={f.required}
                                onChange={event => {
                                    setUserData({
                                        ...userData,
                                        [f.name]: event.target.value,
                                    })
                                }}
                                disabled={f.disabled}
                            />
                        )
                    }

                    if (f.formtype === 'Select') {
                        return (
                            <div>
                                <FormControl
                                    sx={{
                                        alignItems: 'center',
                                        width: '80%',
                                        marginTop: '20px',
                                    }}
                                    key={f.name}
                                >
                                    <InputLabel id="demo-simple-select-label">{f.value}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        value={userData[f.name]}
                                        key={f.name}
                                        sx={{
                                            width: '100%',
                                        }}
                                        onChange={event => {
                                            setUserData({
                                                ...userData,
                                                [f.name]: event.target.value,
                                            })
                                        }}
                                    >
                                        {f.label.map(label => (
                                            <MenuItem value={label.name} key={label.name}>
                                                {label.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        )
                    }

                    if (f.formtype === 'Radio') {
                        return (
                            <div>
                                <FormControl
                                    sx={{
                                        alignItems: 'center',
                                        width: '80%',
                                        marginTop: '20px',
                                    }}
                                    key={f.name}
                                >
                                    <FormLabel id="demo-row-radio-buttons-group-label">{f.name}</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={event => {
                                            setUserData({
                                                ...userData,
                                                [f.name]: event.target.value,
                                            })
                                        }}
                                    >
                                        {f.label.map(label => {
                                            return (
                                                <FormControlLabel
                                                    value={label.name}
                                                    control={<Radio />}
                                                    key={label.name}
                                                    label={label.label}
                                                />
                                            )
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        )
                    }

                    if (f.formtype === 'Time') {
                        return (
                            <div style={{ marginTop: '20px' }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} locale={zhTW}>
                                    <DatePicker
                                        inputFormat="yyyy/MM/dd"
                                        label={f.label}
                                        openTo="year"
                                        views={['year', 'month', 'day']}
                                        value={value}
                                        onChange={newValue => {
                                            console.log(newValue)
                                            setValue(newValue)
                                            setUserData({
                                                ...userData,
                                                [f.name]: `${newValue.getFullYear()}/${newValue.getMonth() + 1}/${newValue.getDate()}`,
                                            })
                                        }}
                                        renderInput={params => <TextField {...params} sx={{ width: '80%' }} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        )
                    }
                })}
            </form>
        )
    }

    const downloadQR = () => {
        const canvas = document.getElementById('QRCode')
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        let downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = '好心肝診所QRcode.png'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    const QRCodeDiv = () => {
        return (
            <div
                className="QRcode"
                style={{
                    backgroundColor: '#FFFFFF',
                    width: '80%',
                    margin: 'auto',
                    paddingTop: '20px',
                    marginTop: '20px',
                    borderRadius: '20px',
                }}
            >
                <div>
                    <QRCode id="QRCode" level="Q" size={200} value={JSON.stringify(userData)} renderAs="canvas" />
                </div>
                <Button
                    sx={{
                        width: '60%',
                        marginTop: '20px',
                        fontSize: '20px',
                        marginBottom: '20px',
                    }}
                    variant="contained"
                    onClick={() => {
                        downloadQR()
                    }}
                >
                    下載條碼
                </Button>
                <Button
                    sx={{
                        width: '60%',
                        fontSize: '20px',
                        marginBottom: '20px',
                    }}
                    variant="outlined"
                    color="error"
                    onClick={() => {
                        setShowQRcodeDiv(false)
                    }}
                >
                    關閉視窗
                </Button>
            </div>
        )
    }

    const ButtonDiv = () => {
        return (
            <Button
                sx={{
                    width: '60%',
                    marginTop: '20px',
                    fontSize: '20px',
                }}
                variant="contained"
                onClick={event => {
                    verify()
                    if(userData.id.substring(1,2) === '1'){
                        userData.gender="男"
                    }else{
                        userData.gender="女"
                    }
                    console.log(userData)
                }}
            >
                產生條碼
            </Button>
        )
    }

    const verify = () => {
        var nullErrorMessage = ''
        var verifyErrorMessage = ''

        if (!userData.id) {
            nullErrorMessage += ' 身分證'
        } else if (!verifyID(userData.id)) {
            verifyErrorMessage += ' 身分證'
        }

        if (!userData.phone) {
            nullErrorMessage += ' 電話'
        } else if (userData.phone.length != 10 && userData.phone.length != 9) {
            verifyErrorMessage += '電話號碼格式錯誤'
        }

        if (!userData.name) {
            nullErrorMessage += ' 姓名'
        }

        if (!userData.phone) {
            nullErrorMessage += ' 電話'
        }
        if (!userData.address) {
            nullErrorMessage += ' 地址'
        }

        if (!userData.birth) {
            nullErrorMessage += ' 生日'
        }

        if (nullErrorMessage) {
            alert('未填欄位：' + nullErrorMessage)
        } else if (verifyErrorMessage) {
            alert('格式錯誤' + verifyErrorMessage)
        } else {
            setShowQRcodeDiv(true)
        }
    }

    return (
        <div style={style}>
            {FormDiv()}

            {showQRcodeDiv ? null : ButtonDiv()}
            {showQRcodeDiv ? QRCodeDiv() : null}
        </div>
    )
}

export default Form
