import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Schedule from '../Pages/Schedule/Schedule';
import Home from '../Pages/Home/Home';
import Record from '../Pages/Record/Record';
import Patient from '../Pages/Patient/Patient';
import Setting from '../Pages/Setting/Setting';
import Report from '../Pages/Report/Report';
import User from '../Pages/User/User';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/record" element={<Record />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/report" element={<Report />} />
            <Route path="/user" element={<User />} />
        </Routes>
    );
};

export default Router;
