import { useState } from "react";
import {
    Select,
    MenuItem,
    InputLabel,
    Button,
    TextField,
    FormControl,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { format } from "date-fns";
import QRCode from "qrcode.react";

import { Format } from "./Format";

const Form = () => {
    const [userData, setUserData] = useState({});
    const [value, setValue] = useState(new Date("2000-01-01"));
    const [showQRcodeDiv, setShowQRcodeDiv] = useState(false);
    const style = {
        marginTop: "20px",
        textAlign: "center",
    };
    const FormDiv = () => {
        return (
            <div>
                {Format.Format.map((Format) => {
                    if (Format.formtype === "Text") {
                        return (
                            <TextField
                                key={Format.name}
                                type={Format.type}
                                id="ID"
                                label={Format.label}
                                variant="outlined"
                                sx={{
                                    width: "80%",
                                    marginTop: "20px",
                                }}
                                required={Format.required}
                                onChange={(event) => {
                                    setUserData({
                                        ...userData,
                                        [Format.name]: event.target.value,
                                    });
                                }}
                                disabled={Format.disabled}
                            />
                        );
                    }

                    if (Format.formtype === "Select") {
                        return (
                            <div>
                                <FormControl
                                    sx={{
                                        alignItems: "center",
                                        width: "80%",
                                        marginTop: "20px",
                                    }}
                                    key={Format.name}
                                >
                                    <InputLabel id="demo-simple-select-label">
                                        {Format.name}
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        value={Format[Format.name]}
                                        key={Format.name}
                                        sx={{
                                            width: "100%",
                                        }}
                                        onChange={(event) => {
                                            setUserData({
                                                ...userData,
                                                [Format.name]:
                                                    event.target.value,
                                            });
                                        }}
                                    >
                                        {Format.label.map((label) => {
                                            return (
                                                <MenuItem
                                                    value={label.name}
                                                    key={label.name}
                                                >
                                                    {label.label}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        );
                    }

                    if (Format.formtype === "Time") {
                        return (
                            <div style={{ marginTop: "20px" }}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <DesktopDatePicker
                                        label={Format.label}
                                        inputFormat="yyyy/MM/dd"
                                        value={value}
                                        onChange={(newValue) => {
                                            let Time = format(
                                                newValue,
                                                "yyyy-MM-dd"
                                            );
                                            setValue(newValue);
                                            setUserData({
                                                ...userData,
                                                [Format.name]: Time,
                                            });
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                sx={{ width: "80%" }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                        );
                    }
                })}
            </div>
        );
    };

    const downloadQR = () => {
        const canvas = document.getElementById("QRCode");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "好心肝診所QRcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const QRCodeDiv = () => {
        return (
            <div
                className="QRcode"
                style={{
                    backgroundColor: "#FFFFFF",
                    width: "80%",
                    margin: "auto",
                    paddingTop: "20px",
                    marginTop: "20px",
                    borderRadius: "20px",
                }}
            >
                <div>
                    <QRCode
                        id="QRCode"
                        level="Q"
                        size={200}
                        value={JSON.stringify(userData)}
                        renderAs="canvas"
                    />
                </div>
                <Button
                    sx={{
                        width: "60%",
                        marginTop: "20px",
                        fontSize: "20px",
                        marginBottom: "20px",
                    }}
                    variant="contained"
                    onClick={() => {
                        downloadQR();
                    }}
                >
                    下載條碼
                </Button>
                <Button
                    sx={{
                        width: "60%",
                        fontSize: "20px",
                        marginBottom: "20px",
                    }}
                    variant="outlined"
                    color="error"
                    onClick={() => {
                        setShowQRcodeDiv(false);
                    }}
                >
                    關閉視窗
                </Button>
            </div>
        );
    };

    const ButtonDiv = () => {
        return (
            <Button
                sx={{
                    width: "60%",
                    marginTop: "20px",
                    fontSize: "20px",
                }}
                variant="contained"
                onClick={() => {
                    console.log(userData);
                    setShowQRcodeDiv(true);
                }}
            >
                產生條碼
            </Button>
        );
    };

    return (
        <div style={style}>
            {FormDiv()}
            {showQRcodeDiv ? null : ButtonDiv()}
            {showQRcodeDiv ? QRCodeDiv() : null}
        </div>
    );
};

export default Form;
