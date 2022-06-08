import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { apiLogin } from '../../Axios/Auth'
import { useDispatch } from 'react-redux'
import { login } from '../../Redux/Slices/Auth'

const Login = () => {
    const [remember, setRemember] = useState(false)
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        dispatch(login({ username: data.get('username'), password: data.get('password'), remember }))
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '1rem',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    好心肝登入
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth label="帳號" name="username" autoComplete="username" autoFocus />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="密碼"
                        type="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={remember} onChange={e => setRemember(e.target.checked)} color="primary" />}
                        label="記住我"
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        登入
                    </Button>

                    <Grid item>
                        <Link href="#" variant="body2">
                            沒有帳號嗎?註冊
                        </Link>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login
