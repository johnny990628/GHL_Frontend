import { combineReducers } from 'redux';
import patientReducer from './Patient';

export default combineReducers({
    patient: patientReducer,
});
