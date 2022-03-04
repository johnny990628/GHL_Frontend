import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from './Slices/Patient';

export default configureStore({
    reducer: {
        patients: patientsReducer,
    },
});
