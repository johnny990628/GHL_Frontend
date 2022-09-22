import { useState, useEffect } from "react";
import {
    Select,
    MenuItem,
    InputLabel,
    Box,
    Button,
    TextField,
    Modal,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
} from "@mui/material";
import QRCode from "qrcode.react";

import SMdatepicker from "./SMdatepicker";
import { verifyID } from "../../Utils/Verify";
import { useFormat } from "./useFormat";
import { apiCheckExists } from "../../Axios/Exists";

const Form = () => {
    //userData
    const [userData, setUserData] = useState({});
    //preset patient birthday time
    const [value, setValue] = useState(new Date());
    //Modal view open state
    const [showQRcodeDiv, setShowQRcodeDiv] = useState(false);

    const [exists, setExists] = useState(false);

    const style = {
        textAlign: "center",
        backgroundColor: "#ffffff",
        width: "90%",
        marginLeft: "5%",
        marginTop: "-50px",
        paddingTop: "20px",
        paddingBottom: "40px",
        boxShadow: "1px 1px 7px rgba(0, 0, 0, 0.7)",
        borderRadius: "10px",
    };

    const { format } = useFormat();

    //Determine the data type from useFormat and render it
    const FormDiv = () => {
        return (
            <form>
                {format.map((f) => {
                    if (f.formtype === "Text") {
                        return (
                            <TextField
                                value={userData[f.name]}
                                key={f.name}
                                type={f.type}
                                id="ID"
                                label={f.label}
                                variant="outlined"
                                sx={{
                                    width: "80%",
                                    marginTop: "20px",
                                }}
                                required={f.required}
                                onChange={(event) => {
                                    setUserData({
                                        ...userData,
                                        [f.name]: event.target.value,
                                    });
                                }}
                                disabled={f.disabled}
                            />
                        );
                    }

                    if (f.formtype === "Select") {
                        return (
                            <div>
                                <FormControl
                                    sx={{
                                        alignItems: "center",
                                        width: "80%",
                                        marginTop: "20px",
                                    }}
                                    key={f.name}
                                >
                                    <InputLabel id="demo-simple-select-label">
                                        {f.value}
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        value={userData[f.name]}
                                        key={f.name}
                                        sx={{
                                            width: "100%",
                                        }}
                                        onChange={(event) => {
                                            setUserData({
                                                ...userData,
                                                [f.name]: event.target.value,
                                            });
                                        }}
                                    >
                                        {f.label.map((label) =>
                                            //判斷是否開啟active
                                            label.active ? (
                                                <MenuItem
                                                    value={label.name}
                                                    key={label.name}
                                                >
                                                    {label.name}
                                                </MenuItem>
                                            ) : null
                                        )}
                                    </Select>
                                </FormControl>
                            </div>
                        );
                    }

                    if (f.formtype === "Radio") {
                        return (
                            <div>
                                <FormControl
                                    sx={{
                                        alignItems: "center",
                                        width: "80%",
                                        marginTop: "20px",
                                    }}
                                    key={f.name}
                                >
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        {f.name}
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={(event) => {
                                            setUserData({
                                                ...userData,
                                                [f.name]: event.target.value,
                                            });
                                        }}
                                    >
                                        {f.label.map((label) => {
                                            return (
                                                <FormControlLabel
                                                    value={label.name}
                                                    control={<Radio />}
                                                    key={label.name}
                                                    label={label.label}
                                                />
                                            );
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        );
                    }

                    if (f.formtype === "Time") {
                        return (
                            <div
                                style={{
                                    textAlign: "left",
                                    width: "80%",
                                    margin: " 20px auto",
                                }}
                            >
                                <SMdatepicker
                                    f={f}
                                    value={value}
                                    setValue={setValue}
                                />
                            </div>
                        );
                    }
                })}
            </form>
        );
    };

    //download QRcode function
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

    //QRcode view function
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
                        size={250}
                        value={JSON.stringify(userData)}
                        renderAs="canvas"
                    />
                </div>
                <Button
                    sx={{
                        width: "100%",
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
                        width: "100%",
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

    //Button view function
    const ButtonDiv = () => {
        return (
            <Button
                sx={{
                    width: "60%",
                    marginTop: "20px",
                    fontSize: "20px",
                }}
                variant="contained"
                onClick={(event) => {
                    userData.birth = value; //.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate();
                    verify();
                    if (userData.id.substring(1, 2) === "1") {
                        userData.gender = "m";
                    } else {
                        userData.gender = "f";
                    }
                }}
            >
                產生條碼
            </Button>
        );
    };

    //verify patientID and patient phone number function
    async function verify() {
        var nullErrorMessage = "";
        var verifyErrorMessage = "";

        if (!userData.id) {
            nullErrorMessage += " 身分證";
        } else if (!verifyID(userData.id)) {
            verifyErrorMessage += " 身分證";
        }

        if (!userData.phone) {
            nullErrorMessage += " 電話";
        } else if (userData.phone.length != 10 && userData.phone.length != 9) {
            verifyErrorMessage += "電話號碼格式錯誤";
        }

        if (!userData.name) {
            nullErrorMessage += " 姓名";
        }

        if (!userData.phone) {
            nullErrorMessage += " 電話";
        }
        if (!userData.address) {
            nullErrorMessage += " 地址";
        }

        if (!userData.birth) {
            nullErrorMessage += " 生日";
        }

        if (nullErrorMessage) {
            alert("未填欄位：" + nullErrorMessage);
        } else if (verifyErrorMessage) {
            alert("格式錯誤" + verifyErrorMessage);
        } else {
            const existsPatient = await apiCheckExists({
                type: "patient",
                value: userData.id,
            });
            if (existsPatient.data) {
                setExists(true);
            } else {
                setExists(false);
            }
            setShowQRcodeDiv(true);
        }
    }

    return (
        <div style={style}>
            {FormDiv()}
            {ButtonDiv()}

            <Modal
                open={showQRcodeDiv}
                onClose={() => {
                    setShowQRcodeDiv(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                        textAlign: "center",
                    }}
                >
                    {exists ? (
                        <>
                            <h2>
                                系統中已有資料
                                <br />
                                報到時請告知工作人員
                            </h2>
                            <Box
                                sx={{
                                    border: "2px solid",
                                    marginBottom: "20px",
                                }}
                            >
                                <h3>ID：{userData.id}</h3>
                            </Box>

                            <Button
                                sx={{
                                    width: "80%",
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
                        </>
                    ) : (
                        QRCodeDiv()
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default Form;
