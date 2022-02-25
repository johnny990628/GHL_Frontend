import React from "react";
import { Routes, Route } from "react-router-dom";
import Schedule from "../Pages/Schedule";
import Home from "../Pages/Home";
import Record from "../Pages/Record";
import Patient from "../Pages/Patient";
import Setting from "../Pages/Setting";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/record" element={<Record />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
};

export default Router;
