import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Schedule from '../Pages/Schedule';
import Home from '../Pages/Home';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
        </Routes>
    );
};

export default Router;
