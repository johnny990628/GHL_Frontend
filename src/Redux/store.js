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
import department4ListReducer from './Slices/Department4List'
import userReducer from './Slices/User'
import dashboardReducer from './Slices/Dashboard'
import statisticReducer from './Slices/Statistic'
import dicomReducer from './Slices/Dicom'
import eventReducer from './Slices/Event'
import event4ListReducer from './Slices/Event4List'

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
        department4List: department4ListReducer,
        user: userReducer,
        dashboard: dashboardReducer,
        statistic: statisticReducer,
        dicom: dicomReducer,
        event: eventReducer,
        event4List: event4ListReducer,
    },
})
