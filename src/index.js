import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import './Assets/Css/index.css';

import store from './Redux/store';
import { fetchPatients } from './Redux/Slices/Patient';
import { Provider } from 'react-redux';

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
});

const whiteTheme = createTheme({
    palette: {
        primary: {
            main: '#EAA7B8',
            light: 'rgba(255,255,255)',
        },
        secondary: {
            main: 'rgba(255,255,255)',
        },
        background: {
            default: 'rgba(255,255,255)',
        },
        text: {
            primary: 'rgba(0,0,0)',
            secondary: 'rgba(255,255,255)',
        },
    },
    typography: {
        fontFamily: `'cwTeXYen', sans-serif`,
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={pinkTheme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </StyledEngineProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
