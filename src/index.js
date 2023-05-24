import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import './Assets/Css/index.css'
import 'react-day-picker/dist/style.css'

import store from './Redux/store'
import { Provider } from 'react-redux'

const pinkTheme = createTheme({
    palette: {
        primary: {
            main: '#A34059',
            light: 'rgba(163, 64, 89,.2)',
        },
        secondary: {
            main: 'rgba(245, 215, 222)', //hex: #F5D7DE
        },
        background: {
            default: '#EAA7B8',
        },
        text: {
            primary: 'rgba(0,0,0,.8)',
            secondary: '#A34059',
            // secondary: '#EAA7B8',
        },
    },
    typography: {
        fontFamily: `'cwTeXYen', sans-serif`,
    },
})

const whiteTheme = createTheme({
    palette: {
        primary: {
            main: '#A34059',
            light: 'rgba(223, 142, 162 , .2)',
            light_secondary: 'rgba(223, 142, 162 , .5)',
        },
        secondary: {
            main: 'rgba(251, 248, 242,.7)',
        },
        background: {
            main: 'rgb(247, 222, 227)',
            default: 'rgba(251, 248, 242,.85)',
            secondary: 'rgba(251, 248, 242,.95)',
            opaque: 'rgb(248, 240, 235)',
        },
        text: {
            primary: 'rgba(36, 31, 33)',
            secondary: '#A34059',
            gray: '#6c747f',
        },
        border: {
            main: 'rgba(193, 181, 184 , .5)',
        },
        contrast: {
            main: 'rgba(64, 127, 127,.9)',
            dark: 'rgba(64, 127, 127)',
        },
        status: {
            processing: 'rgba(226, 116, 111,.1)',
            processing_dark: 'rgba(226, 116, 111)',
            finish: 'rgba(95, 91, 160,.1)',
            finish_dark: 'rgba(95, 91, 160)',
            yet: 'rgba(109, 173, 173,.1)',
            yet_dark: 'rgba(109, 173, 173)',
            call: 'rgba(255, 183, 102,.1)',
            call_dark: 'rgba(255, 183, 102)',
        },
        gray: {
            main: '#9E9EA7',
        },
        red: {
            main: 'rgba(226, 116, 111)',
        },
    },
    typography: {
        fontFamily: `'cwTeXYen', sans-serif`,
    },
})

// store.dispatch(fetchPatients()) //Fetch Initial Data

ReactDOM.render(
    <Provider store={store}>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={whiteTheme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    </Provider>,
    document.getElementById('root')
)
