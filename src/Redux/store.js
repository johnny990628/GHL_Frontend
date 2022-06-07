import { configureStore } from '@reduxjs/toolkit'
import patientsReducer from './Slices/Patient'
import reportReducer from './Slices/Report'
import sidebarReducer from './Slices/Sidebar'
import dashboardReducer from './Slices/Dashboard'
import dialogReducer from './Slices/Dialog'
import alertReducer from './Slices/Alert'
import authReducer from './Slices/Auth'

export default configureStore({
    reducer: {
        patients: patientsReducer,
        report: reportReducer,
        sidebar: sidebarReducer,
        dashboard: dashboardReducer,
        dialog: dialogReducer,
        alert: alertReducer,
        auth: authReducer,
    },
})
