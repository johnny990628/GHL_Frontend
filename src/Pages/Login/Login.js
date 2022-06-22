import React, { useState } from 'react'
import {
    Box,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Typography,
    Container,
    Grow,
    IconButton,
    useMediaQuery,
} from '@mui/material'

import { Person, PersonAdd } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'

import useStyles from './Style'

import { login, register } from '../../Redux/Slices/Auth'

const Login = () => {
    const [page, setPage] = useState('login')
    const [remember, setRemember] = useState(true)

    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme()
    const com = useMediaQuery(theme.breakpoints.up('lg'))

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
            <Box className={classes.formContainer}>
                <img src="./logo.png" alt="logo" style={{ width: '3.8rem', height: '4rem' }} />
                <Typography component="h1" variant="h5">
                    註冊
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
            <Box className={classes.formContainer}>
                <img src="./logo.png" alt="logo" style={{ width: '3.8rem', height: '4rem' }} />

                <Typography component="h1" variant="h5">
                    登入
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
        <Container
            component="main"
            sx={{ height: '90vh', display: 'flex', justifyContent: com ? 'space-between' : 'center', alignItems: 'center' }}
        >
            <CssBaseline />

            {com && (
                <IconButton className={classes.iconButton} sx={{ backgroundColor: '#72B2B2' }} onClick={() => setPage('login')}>
                    <Person className={classes.icons} />
                </IconButton>
            )}

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
            {com && (
                <IconButton className={classes.iconButton} sx={{ backgroundColor: '#EAA7B8' }} onClick={() => setPage('register')}>
                    <PersonAdd className={classes.icons} />
                </IconButton>
            )}
        </Container>
    )
}

export default Login
