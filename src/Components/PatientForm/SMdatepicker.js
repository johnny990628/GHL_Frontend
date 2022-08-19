import react, { useEffect, useState } from 'react'
import { Button, Modal, Box, Grid, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

function SMdatepicker(props) {
    const [open, setOpen] = useState(false) //控制Modal開關
    const [loop, setLoop] = useState(1) //提供Modal循環次數 1年 2月 3日
    const [day, setDay] = useState([]) //提供日期選擇

    //按下生日按鈕預設 年 日 開啟Modal
    const handleOpen = () => {
        setDay([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28])
        setOpen(true)
        setLoop(1)
    }
    const handleClose = () => setOpen(false)
    const style = {
        borderStyle: 'solid',
        borderWidth: '1.5px',
        borderColor: '#d1cfcf',
        borderRadius: '3px',
        lineHeight: '3',
        paddingLeft: '10px',
        width: '100%',
        justifyContent: 'flex-start',
    }

    const ModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: window.innerHeight / 2,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: '20px',
    }

    //民國生日Value
    const birthdayValue = () => {
        return (
            <font color="#A34059">
                {props.f.label}*　民國 {props.value.getFullYear() - 1911} 年 {props.value.getMonth() + 1} 月 {props.value.getDate()} 日
            </font>
        )
    }

    const ModalValue = () => {
        const [year, setYear] = useState([])
        //預設月份
        const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        //大月
        const bigMonth = [1, 3, 5, 7, 8, 10, 12]

        useEffect(() => {
            setYear([])
            //今日年份往前算100年
            for (let i = 0; i < 100; i++) {
                setYear(year => [...year, new Date().getFullYear() - i - 1911])
            }
        }, [])

        const Yearview = () => {
            return (
                <>
                    {year.map((item, index) => (
                        //xs 最小 768px sm 最小 992px md 最小 1200px lg 最小 1600px xl 最小 1920px
                        <Grid item xs={0.3} sm={2} md={1} key={index}>
                            <Button
                                variant="outlined"
                                sx={{ borderRadius: '20px', padding: '10px' }}
                                onClick={() => {
                                    const newDate = new Date(props.value)
                                    newDate.setFullYear(item + 1911) //因為是民國年所以要加上1911
                                    props.setValue(newDate) //更新日期
                                    setLoop(2) //更新循環次數月
                                }}
                            >
                                {item}年
                            </Button>
                        </Grid>
                    ))}
                </>
            )
        }

        const Monthview = () => {
            return (
                <>
                    {month.map((item, index) => (
                        <Grid item xs={0.3} sm={2} md={1} key={index}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: '20px',
                                    padding: '10px',
                                    width: '100%',
                                    marginTop: '20px',
                                }}
                                onClick={() => {
                                    const newDate = new Date(props.value)
                                    newDate.setMonth(item - 1)
                                    props.setValue(newDate) //更新月

                                    //以下判斷大月或小月，二月份要判斷閏年
                                    if (item === 2) {
                                        if (props.value.getFullYear() % 4 === 0) {
                                            setDay(day => [...day, 29])
                                        } else {
                                            setDay(day)
                                        }
                                    } else if (bigMonth.includes(item)) {
                                        setDay(day => [...day, 29, 30, 31])
                                    } else {
                                        setDay(day => [...day, 29, 30])
                                    }
                                    setLoop(3)
                                }}
                            >
                                {item}月
                            </Button>
                        </Grid>
                    ))}
                </>
            )
        }

        const Dayview = () => {
            return (
                <>
                    {day.map((item, index) => (
                        <Grid item xs={0.3} sm={2} md={1} key={index}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: '20px',
                                    padding: '10px',
                                    width: '100%',
                                    marginTop: '20px',
                                }}
                                onClick={() => {
                                    const newDate = new Date(props.value)
                                    newDate.setDate(item)
                                    props.setValue(newDate)
                                    setOpen(false)
                                }}
                            >
                                {item}
                            </Button>
                        </Grid>
                    ))}
                </>
            )
        }

        return (
            <Box
                sx={{
                    width: '100%',
                    height: window.innerHeight / 2,
                    marginTop: '10px',
                    paddingLeft: '25px',
                }}
            >
                <Grid
                    container
                    spacing={{ xs: 1, md: 3 }}
                    columns={{ xs: 1, sm: 12, md: 12 }}
                    style={{
                        overflowY: 'scroll',
                        maxHeight: window.innerHeight / 2.3,
                    }}
                >
                    {/* loop判斷當前顯示年月日畫面 */}
                    {loop === 1 ? Yearview() : null}
                    {loop === 2 ? Monthview() : null}
                    {loop === 3 ? Dayview() : null}
                </Grid>
            </Box>
        )
    }
    return (
        <>
            <Button style={style} className="dateButton" onClick={handleOpen}>
                {birthdayValue()}
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={ModalStyle}>
                    <IconButton
                        aria-label="Clear"
                        sx={{
                            float: 'right',
                            marginTop: '1px',
                        }}
                        onClick={handleClose}
                    >
                        <ClearIcon />
                    </IconButton>
                    <Box
                        sx={{
                            boxShadow: 24,
                            p: 4,
                            textAlign: 'center',
                            paddingTop: '20px',
                        }}
                    >
                        {birthdayValue()}
                        {ModalValue()}
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default SMdatepicker
