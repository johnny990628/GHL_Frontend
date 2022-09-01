import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetDepartments } from '../../Axios/Department'

import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

export const fetchStatistic = createAsyncThunk('statistic/fetchStatistic', async (_, thunkAPI) => {
    try {
        const departments = await apiGetDepartments({ limit: 100, offset: 0, sort: 'createdAt', desc: -1 })
        return { departments: departments.data.results }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})
const initialState = { departments: [] }
const statisticSlice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchStatistic.fulfilled]: (state, action) => {
            return {
                ...action.payload,
            }
        },
        [fetchStatistic.rejected]: (state, action) => {
            return initialState
        },
    },
})

export default statisticSlice.reducer
