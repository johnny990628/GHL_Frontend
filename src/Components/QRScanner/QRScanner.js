import React, { useEffect, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Button } from '@mui/material'
import useStyles from './Style'
const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } }
let html5QrCode

const QRScanner = ({ onResult }) => {
    const classes = useStyles()
    const [isScanning, setIsScanning] = useState(false)
    useEffect(() => {
        html5QrCode = new Html5Qrcode('reader')
    }, [])

    const handleClickAdvanced = () => {
        const qrCodeSuccessCallback = (decodedText, decodedResult) => {
            onResult(decodedText)
            handleStop()
        }
        html5QrCode.start({ facingMode: 'environment' }, qrConfig, qrCodeSuccessCallback)
        setIsScanning(true)
    }

    const handleStop = () => {
        try {
            html5QrCode
                .stop()
                .then(res => {
                    html5QrCode.clear()
                })
                .catch(err => {
                    console.log(err.message)
                })
            setIsScanning(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div id="reader" width="100%" />
            {isScanning ? (
                <Button variant="contained" className={[classes.button, classes.qrcodeButton]} onClick={() => handleStop()}>
                    停止
                </Button>
            ) : (
                <Button variant="contained" className={[classes.button, classes.qrcodeButton]} onClick={() => handleClickAdvanced()}>
                    掃描
                </Button>
            )}
        </>
    )
}
export default QRScanner
