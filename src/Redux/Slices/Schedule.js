import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSchedule } from '../../Axios/Schedule'

const initialState = {
    loading: false,
    data: [],
    error: '',
}

export const fetchSchedules = createAsyncThunk('schdules/fetchSchedules', async () => {
    try {
        const response = await apiGetSchedule()
        return response.data
    } catch (error) {
        return error.message
    }
})

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSchedules.pending]: (state, action) => {
            state.loading = true
        },
        [fetchSchedules.fulfilled]: (state, action) => {
            state.loading = false
            state.data = [...state.data, ...action.payload]
        },
        [fetchSchedules.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export default scheduleSlice.reducer
