import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiDeleteReport, apiGetReports } from '../../Axios/Report'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

export const fetchReport = createAsyncThunk('report/fetchReport', async (params, thunkAPI) => {
    try {
        const response = await apiGetReports(params)
        const { results, count } = response.data
        return { results, count, page: Math.ceil(count / params.limit) }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})
export const deleteReport = createAsyncThunk('report/deleteReport', async (reportID, thunkAPI) => {
    try {
        const response = await apiDeleteReport(reportID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { results: [], count: 0, page: 1 }

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        reportTrigger: (state, action) => ({ ...state, count: -1 }),
    },
    extraReducers: {
        [fetchReport.fulfilled]: (state, action) => {
            return {
                ...action.payload,
            }
        },
        [fetchReport.rejected]: (state, action) => {
            return initialState
        },
        [deleteReport.fulfilled]: (state, action) => {
            return {
                ...state,
                count: state.count - 1,
            }
        },
    },
})

export const { reportTrigger } = reportSlice.actions

export default reportSlice.reducer
