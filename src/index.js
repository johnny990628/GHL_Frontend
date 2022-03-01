import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Assets/Css/index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A34059",
      main_light: "rgba(163, 64, 89,.2)",
      secondary: "rgba(245, 215, 222)", //hex: #F5D7DE
    },
    background: {
      default: "#EAA7B8",
    },
    text: {
      primary: "rgba(0,0,0,.6)",
    },
  },
  typography: {
    fontFamily: `'cwTeXYen', sans-serif`,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
