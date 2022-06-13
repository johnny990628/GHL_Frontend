import React, { useEffect, useState } from 'react'
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
import { useDispatch } from 'react-redux'
import { login, register } from '../../Redux/Slices/Auth'
import useStyles from './Style'
import { Grow } from '@mui/material'

const Login = () => {
    const [page, setPage] = useState('login')
    const [remember, setRemember] = useState(true)

    const dispatch = useDispatch()
    const classes = useStyles()

    const handleLoginSubmit = e => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        dispatch(login({ username: data.get('username'), password: data.get('password'), remember }))
    }
    const handleRegisterSubmit = e => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        dispatch(register({ username: data.get('username'), password: data.get('password'), name: data.get('name') }))
        setPage('login')
    }

    const RegisterSection = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '1rem',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon className={classes.icon} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    好心肝註冊
                </Typography>
                <Box component="form" onSubmit={handleRegisterSubmit} noValidate sx={{ mt: 1 }}>
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
                    <TextField margin="normal" required fullWidth name="name" label="姓名" type="text" />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        註冊
                    </Button>
                    <Grid item>
                        <Link href="#" variant="body2" onClick={() => setPage('login')}>
                            有帳號了嗎?返回登入
                        </Link>
                    </Grid>
                </Box>
            </Box>
        )
    }

    const LoginSection = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '1rem',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon className={classes.icon} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    好心肝登入
                </Typography>
                <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
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
                        <Link href="#" variant="body2" onClick={() => setPage('register')}>
                            沒有帳號嗎?註冊
                        </Link>
                    </Grid>
                </Box>
            </Box>
        )
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ padding: 20 }}>
            <CssBaseline />

            {page === 'login' && (
                <Grow in={page === 'login'} timeout={1000}>
                    <div>
                        <LoginSection />
                    </div>
                </Grow>
            )}

            {page === 'register' && (
                <Grow in={page === 'register'} timeout={1000}>
                    <div>
                        <RegisterSection />
                    </div>
                </Grow>
            )}
        </Container>
    )
}

export default Login