import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, useLocation, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Login from "./Pages/Login/Login";
import { apiVerify } from "./Axios/Auth";
import { fillAuthState } from "./Redux/Slices/Auth";
import CustomAlert from "./Components/CustomAlert/CustomAlert";
import PatientForm from "./Pages/PatientForm";

const App = () => {
   

    return (
        <>
            <Layout/>
            <CustomAlert />
        </>
    );
};


export default App;
