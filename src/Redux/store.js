import { configureStore } from '@reduxjs/toolkit'
import patientsReducer from './Slices/Patient'
import reportFormReducer from './Slices/ReportForm'
import sidebarReducer from './Slices/Sidebar'
import dialogReducer from './Slices/Dialog'
import alertReducer from './Slices/Alert'
import authReducer from './Slices/Auth'
import reportReducer from './Slices/Report'
import scheduleReducer from './Slices/Schedule'
import departmentReducer from './Slices/Department'
import userReducer from './Slices/User'
import DashboardReducer from './Slices/Dashboard'
import StatisticReducer from './Slices/Statistic'

export default configureStore({
    reducer: {
        patients: patientsReducer,
        reportForm: reportFormReducer,
        sidebar: sidebarReducer,
        dialog: dialogReducer,
        alert: alertReducer,
        auth: authReducer,
        report: reportReducer,
        schedule: scheduleReducer,
        department: departmentReducer,
        user: userReducer,
        dashboard: DashboardReducer,
        statistic: StatisticReducer,
    },
})
