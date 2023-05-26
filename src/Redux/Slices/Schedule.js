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
import { apiAddWorklist } from '../../Axios/WorkList'

export const fetchSchedule = createAsyncThunk('schedule/fetchSchedule', async (params, thunkAPI) => {
    try {
        const response = await apiGetSchdules(params)
        const { results, count } = response.data

        return {
            schedules: results,
            count,
            page: Math.ceil(count / params.limit),
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
        const bloodResponse = await apiAddBlood({ patientID, number: blood })
        const worklistResponse = await apiAddWorklist(patientID)
        await apiAddSchedule({
            patientID,
            reportID,
            procedureCode,
            status: 'wait-examination',
            bloodID: bloodResponse.data._id,
            StudyInstanceUID: worklistResponse.data.studyInstanceUID,
        })
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

export const removeSchedule = createAsyncThunk('schedule/removeSchedule', async (scheduleID, thunkAPI) => {
    try {
        const response = await apiDeleteScheduleAndBloodAndReport(scheduleID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { schedules: [], count: 0, page: 1, loading: false }
const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        scheduleTrigger: (state, action) => {
            return { ...state, count: -1 }
        },
    },
    extraReducers: {
        [fetchSchedule.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            }
        },
        [fetchSchedule.fulfilled]: (state, action) => {
            return {
                ...action.payload,
                loading: false,
            }
        },
        [fetchSchedule.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
    },
})

export const { scheduleTrigger } = scheduleSlice.actions
export default scheduleSlice.reducer
