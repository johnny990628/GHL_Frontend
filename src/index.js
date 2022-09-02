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
            main: 'rgba(255,253,254)',
        },
        background: {
            default: 'rgba(255, 238, 247 )',
        },
        text: {
            primary: 'rgba(36, 31, 33)',
            secondary: '#A34059',
        },
        border: {
            main: 'rgba(193, 181, 184 , .5)',
        },
        contrast: {
            main: 'rgba(64, 127, 127,.9)',
            dark: 'rgba(64, 127, 127)',
        },
        status: {
            processing: 'rgba(163, 64, 89,.2)',
            finish: 'rgba(46, 67, 114,.2)',
            yet: 'rgba(64, 127, 127,.2)',
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
