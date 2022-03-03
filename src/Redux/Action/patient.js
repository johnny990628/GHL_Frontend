import { fetchPatients } from '../../Axios/patient';

const fetchPatientsRequest = () => {
    return {
        type: 'FETCH_PATIENTS_REQUEST',
    };
};

const fetchPatientsSuccess = (patients) => {
    return {
        type: 'FETCH_PATIENTS_SUCCESS',
        payload: patients,
    };
};

const fetchPatientsFailure = (error) => {
    return {
        type: 'FETCH_PATIENTS_FAILURE',
        payload: error,
    };
};

export const getPatients = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchPatientsRequest());
            const response = await fetchPatients();
            dispatch(fetchPatientsSuccess(response.data));
        } catch (error) {
            dispatch(fetchPatientsFailure(error.message));
        }
    };
};
