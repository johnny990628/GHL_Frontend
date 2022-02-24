import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Assets/Css/index.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#EAA7B8',
        },
        background: {
            default: '#e4ece2',
        },
        text: {
            primary: '#000000',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
