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
    const dispatch = useDispatch();
    const { verify } = useSelector((state) => state.auth);
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    useEffect(() => {
        if (isLoggedIn)
            apiVerify().then((res) =>
                dispatch(
                    fillAuthState({
                        user: res.data.user,
                        token: res.data.token,
                    })
                )
            );
    }, []);

    return (
        <>
            {verify ? <Layout /> : <NotLoginLayOut />}
            <CustomAlert />
        </>
    );
};

const NotLoginLayOut = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="*" element={<Login />} />
                <Route path="/patientform" element={<PatientForm />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
