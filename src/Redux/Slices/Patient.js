import { apiCreatePatient, apiDeletePatientAndBloodAndSchedule, apiGetPatients, apiUpdatePatient } from '../../Axios/Patient'
import { apiDeleteScheduleAndBloodAndReport } from '../../Axios/Schedule'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

const initialState = { loading: false, data: [], count: 0, page: 1 }

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async ({ limit, offset, search, sort, desc, status }, thunkAPI) => {
    try {
        const response = await apiGetPatients({ limit, offset, search, sort, desc, status })
        return { ...response.data, page: Math.ceil(response.data.count / limit) }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const createPatient = createAsyncThunk('patients/createPatient', async (data, thunkAPI) => {
    try {
        const response = await apiCreatePatient(data)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const updatePatient = createAsyncThunk('patients/updatePatient', async (data, thunkAPI) => {
    try {
        const response = await apiUpdatePatient(data.id, data)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const deletePatient = createAsyncThunk('patients/deletePatient', async ({ patientID }, thunkAPI) => {
    try {
        const response = await apiDeletePatientAndBloodAndSchedule(patientID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const removeProcessing = createAsyncThunk('patients/removeProcessing', async (patientID, thunkAPI) => {
    try {
        const response = await apiDeleteScheduleAndBloodAndReport(patientID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        patientTrigger: (state, action) => ({ ...state, count: -1 }),
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
    },
})

export const { patientTrigger } = patientsSlice.actions

export default patientsSlice.reducer
