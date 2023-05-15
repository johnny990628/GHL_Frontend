import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'
import { apiGetEvents } from '../../Axios/Event'

export const fetchEvent4List = createAsyncThunk('event/fetchREvent4List', async (_, thunkAPI) => {
    try {
        const response = await apiGetEvents({ limit: 100, offset: 0 })
        const { results, count } = response.data
        return { events: results.filter(r => r.active) }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { events: [] }

const eventSlice = createSlice({
    name: 'event4list',
    initialState,
    extraReducers: {
        [fetchEvent4List.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            }
        },
        [fetchEvent4List.fulfilled]: (state, action) => {
            return {
                ...action.payload,
                loading: false,
            }
        },
        [fetchEvent4List.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
    },
})

export default eventSlice.reducer
