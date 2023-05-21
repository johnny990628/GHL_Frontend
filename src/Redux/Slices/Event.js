import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'
import { apiCreateEvent, apiDeleteEvent, apiGetEvents, apiUpdateEvent } from '../../Axios/Event'
import { openAlert } from './Alert'

export const fetchEvent = createAsyncThunk('event/fetchEvent', async (params, thunkAPI) => {
    try {
        const response = await apiGetEvents(params)
        const { results, count } = response.data
        return { results, count, page: Math.ceil(count / params.limit) }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const createEvent = createAsyncThunk('event/createEvent', async ({ name, datetime, departmentID, creator }, thunkAPI) => {
    try {
        const response = await apiCreateEvent({ name, datetime, departmentID, creator })
        thunkAPI.dispatch(
            openAlert({
                toastTitle: '新增成功',
                text: name,
                icon: 'success',
            })
        )
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const updateEvent = createAsyncThunk('event/updateEvent', async ({ eventID, data }, thunkAPI) => {
    try {
        const response = await apiUpdateEvent(eventID, data)
        thunkAPI.dispatch(
            openAlert({
                toastTitle: '修改成功',
                text: data.name,
                icon: 'success',
            })
        )
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const deleteEvent = createAsyncThunk('event/deleteEvent', async (eventID, thunkAPI) => {
    try {
        const response = await apiDeleteEvent(eventID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})
export const activeEvent = createAsyncThunk('event/activeEvent', async ({ eventID, active }, thunkAPI) => {
    try {
        const response = await apiUpdateEvent(eventID, { active })
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { results: [], count: 0, page: 1, loading: false }

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        eventTrigger: (state, action) => ({ ...state, count: -1 }),
    },
    extraReducers: {
        [fetchEvent.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            }
        },
        [fetchEvent.fulfilled]: (state, action) => {
            return {
                ...action.payload,
                loading: false,
            }
        },
        [fetchEvent.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        // [deleteReport.fulfilled]: (state, action) => {
        //     return {
        //         ...state,
        //         count: state.count - 1,
        //     }
        // },
    },
})

export const { eventTrigger } = eventSlice.actions

export default eventSlice.reducer
