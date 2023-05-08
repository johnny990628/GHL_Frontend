import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiAddBlood } from '../../Axios/Blood'
import { apiCreateReport } from '../../Axios/Report'
import {
    apiAddSchedule,
    apiDeleteScheduleAndBloodAndReport,
    apiGetSchdules,
    apiUpdateSchedule,
    apiUpdateScheduleStatus,
} from '../../Axios/Schedule'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

export const fetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (_, thunkAPI) => {
    try {
        const response = await apiGetSchdules({})
        const { results, count } = response.data
        const scheduleList = results.filter(r => r.status === 'wait-examination')

        return {
            schedules: scheduleList,
            patients: scheduleList.map(({ patient, blood }) => ({ ...patient, blood: blood.number })),
            count,
        }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const addSchedule = createAsyncThunk('schedule/addSchedule', async ({ patientID, procedureCode, blood }, thunkAPI) => {
    try {
        const reportResponse = await apiCreateReport({ patientID })
        const reportID = reportResponse.data._id
        const scheduleResponse = await apiAddSchedule({ patientID, reportID, procedureCode, status: 'wait-examination' })
        const scheduleID = scheduleResponse.data._id
        await apiAddBlood({ patientID, number: blood, scheduleID })
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const updateSchedule = createAsyncThunk('schedule/updateSchedule', async ({ scheduleID, data }, thunkAPI) => {
    try {
        await apiUpdateSchedule(scheduleID, data)
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const changeScheduleStatus = createAsyncThunk('schedule/changeScheduleStatus', async ({ scheduleID, status }, thunkAPI) => {
    try {
        await apiUpdateScheduleStatus({ scheduleID, status })
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
    },
})

export default scheduleSlice.reducer
