import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiCreateDepartment, apiDeleteDepartment, apiGetDepartments } from '../../Axios/Department'
import { apiDeleteScheduleAndBloodAndReport, apiGetSchdules } from '../../Axios/Schedule'

import { openAlert } from './Alert'
import { logout } from './Auth'

export const fetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (_, thunkAPI) => {
    try {
        const response = await apiGetSchdules({ procedureCode: '19009C' })
        const { results, count } = response.data
        return { schedules: results, patients: results.map(s => s.patient), count }
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

export const removeSchedule = createAsyncThunk('schedule/removeSchedule', async (patientID, thunkAPI) => {
    try {
        const response = await apiDeleteScheduleAndBloodAndReport(patientID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { schedules: [], patients: [], count: 0 }
const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,

    extraReducers: {
        [fetchSchedule.fulfilled]: (state, action) => {
            return {
                ...action.payload,
            }
        },
        [removeSchedule.fulfilled]: (state, action) => {
            const { patientID } = action.payload
            return {
                schedules: state.schedules.filter(schedule => schedule.patientID !== patientID),
                patients: state.patients.filter(patient => patient.id !== patientID),
                count: state.count - 1,
            }
        },
    },
})

export default scheduleSlice.reducer
