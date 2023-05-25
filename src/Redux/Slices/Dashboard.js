import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetDashboard } from '../../Axios/Dashboard'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

export const fetchDashboard = createAsyncThunk('dashboard/fetchDashboard', async (_, thunkAPI) => {
    try {
        const response = await apiGetDashboard({ limit: 5 })
        const { patients, waitExaminationSchedule, finishSchedule, count } = response.data

        return { patients, waitExaminationSchedule, finishSchedule, count }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { patients: [], waitExamintionSchedule: [], finishSchedule: [], count: { patient: 0, waitExamination: 0, finish: 0 } }
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchDashboard.fulfilled]: (state, action) => {
            return { ...state, ...action.payload }
        },
        [fetchDashboard.rejected]: (state, action) => {
            return initialState
        },
    },
})

export default dashboardSlice.reducer
