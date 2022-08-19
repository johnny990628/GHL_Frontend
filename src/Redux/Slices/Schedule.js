import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiAddBlood } from '../../Axios/Blood'
import { apiCreateReport } from '../../Axios/Report'
import { apiAddSchedule, apiDeleteScheduleAndBloodAndReport, apiGetSchdules } from '../../Axios/Schedule'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

export const fetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (_, thunkAPI) => {
    try {
        const response = await apiGetSchdules({ procedureCode: '19009C' })
        const { results, count } = response.data
        return { schedules: results, patients: results.map(({ patient, blood }) => ({ ...patient, blood: blood.number })), count }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const addSchedule = createAsyncThunk('schedule/addSchedule', async ({ patientID, procedureCode, blood }, thunkAPI) => {
    try {
        const reportResponse = await apiCreateReport({ patientID, procedureCode, blood })
        const reportID = reportResponse.data._id
        await apiAddSchedule({ patientID, reportID, procedureCode })
        await apiAddBlood({ patientID, number: blood })
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const removeSchedule = createAsyncThunk('schedule/removeSchedule', async (patientID, thunkAPI) => {
    try {
        const response = await apiDeleteScheduleAndBloodAndReport(patientID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
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
        [addSchedule.fulfilled]: (state, action) => {
            return {
                ...state,
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
