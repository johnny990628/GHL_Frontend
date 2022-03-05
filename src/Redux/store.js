import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from './Slices/Patient';
import drawerReducer from './Slices/Drawer';
import scheduleReducer from './Slices/Schedule';

export default configureStore({
    reducer: {
        patients: patientsReducer,
        schedule: scheduleReducer,
        drawer: drawerReducer,
    },
});
