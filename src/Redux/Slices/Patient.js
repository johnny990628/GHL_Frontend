import { apiCreatePatient, apiDeletePatientAndBloodAndSchedule, apiGetPatients, apiUpdatePatient } from '../../Axios/Patient'
import { apiDeleteScheduleAndBloodAndReport } from '../../Axios/Schedule'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { logout } from './Auth'

const initialState = { loading: false, data: [], count: 0, page: 1, error: '' }

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async ({ limit, offset, search, sort, desc }, thunkAPI) => {
    try {
        const response = await apiGetPatients({ limit, offset, search, sort, desc })
        return { ...response.data, page: Math.ceil(response.data.count / limit) }
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

export const createPatient = createAsyncThunk('patients/createPatient', async (data, thunkAPI) => {
    try {
        const response = await apiCreatePatient(data)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

export const updatePatient = createAsyncThunk('patients/updatePatient', async (data, thunkAPI) => {
    try {
        const response = await apiUpdatePatient(data.id, data)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

export const deletePatient = createAsyncThunk('patients/deletePatient', async ({ patientID }, thunkAPI) => {
    try {
        const response = await apiDeletePatientAndBloodAndSchedule(patientID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

export const removeProcessing = createAsyncThunk('patients/removeProcessing', async (patientID, thunkAPI) => {
    try {
        const response = await apiDeleteScheduleAndBloodAndReport(patientID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        patientTrigger: (state, action) => ({ ...state, count: 0 }),
    },
    extraReducers: {
        [fetchPatients.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            }
        },
        [fetchPatients.fulfilled]: (state, action) => {
            const { results, count, page } = action.payload
            return {
                ...state,
                loading: false,
                data: results,
                count,
                page,
            }
        },
        [fetchPatients.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        [createPatient.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                count: state.count + 1,
            }
        },
        [updatePatient.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                count: 0,
            }
        },
        [deletePatient.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                count: state.count - 1,
            }
        },

        [fetchPatients.rejected]: (state, action) => {
            return initialState
        },
        [fetchPatients.rejected]: (state, action) => {
            return initialState
        },
        [createPatient.rejected]: (state, action) => {
            return initialState
        },
        [updatePatient.rejected]: (state, action) => {
            return initialState
        },
        [deletePatient.rejected]: (state, action) => {
            return initialState
        },
    },
})

export const { patientTrigger } = patientsSlice.actions

export default patientsSlice.reducer
