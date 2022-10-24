import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetDashboard, apiGetDashboardByDepartmentID } from '../../Axios/Dashboard'
import { apiGetDepartments } from '../../Axios/Department'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

export const fetchDashboard = createAsyncThunk('dashboard/fetchDashboard', async ({ dateFrom, dateTo, department }, thunkAPI) => {
    try {
        const response = department
            ? await apiGetDashboardByDepartmentID(department, { dateFrom, dateTo, limit: 5 })
            : await apiGetDashboard({ dateFrom, dateTo, limit: 5 })
        const { patients, reports, schedules, count } = response.data

        return { patients: patients, reports: reports, schedules: schedules, count: count }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const fetchDepartment = createAsyncThunk('dashboard/fetchDepartment', async (_, thunkAPI) => {
    try {
        const departments = await apiGetDepartments({ limit: 100, offset: 0, sort: 'createdAt', desc: -1 })
        return { departments: departments.data.results }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})
const initialState = { patients: [], reports: [], schedules: [], departments: [], count: { patient: 0, report: 0, schedule: 0 } }
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchDashboard.fulfilled]: (state, action) => {
            return { ...state, ...action.payload }
        },
        [fetchDashboard.rejected]: (state, action) => {
            return { ...initialState, departments: state.departments }
        },
        [fetchDepartment.fulfilled]: (state, action) => {
            return { ...state, ...action.payload }
        },
        [fetchDepartment.rejected]: (state, action) => {
            return { ...initialState, departments: [] }
        },
    },
})

export default dashboardSlice.reducer
