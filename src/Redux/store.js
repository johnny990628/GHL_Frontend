import { configureStore } from '@reduxjs/toolkit'
import patientsReducer from './Slices/Patient'
import reportReducer from './Slices/Report'
import sidebarReducer from './Slices/Sidebar'
import dashboardReducer from './Slices/Dashboard'
import dialogReducer from './Slices/Dialog'
import snackbarReducer from './Slices/Snackbar'
import scheduleReducer from './Slices/Schedule'

export default configureStore({
    reducer: {
        patients: patientsReducer,
        report: reportReducer,
        schedule: scheduleReducer,
        sidebar: sidebarReducer,
        dashboard: dashboardReducer,
        dialog: dialogReducer,
        snackbar: snackbarReducer,
    },
})
