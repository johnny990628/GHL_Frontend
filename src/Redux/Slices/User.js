import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiDeleteUser, apiGetUsers } from '../../Axios/User'
import { logout } from './Auth'

export const fetchUser = createAsyncThunk('user/fetchUser', async (params, thunkAPI) => {
    try {
        const response = await apiGetUsers(params)
        const { results, count } = response.data
        return { results, count, page: Math.ceil(count / params.limit) }
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})
export const deleteUser = createAsyncThunk('user/deleteUser', async (userID, thunkAPI) => {
    try {
        const response = await apiDeleteUser(userID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})
const initialState = { results: [], count: 0, page: 1 }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userTrigger: (state, action) => ({ ...state, count: -1 }),
    },
    extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {
            return {
                ...action.payload,
            }
        },
        [fetchUser.rejected]: (state, action) => {
            return initialState
        },
        [deleteUser.fulfilled]: (state, action) => {
            return {
                ...state,
                count: state.count - 1,
            }
        },
    },
})
export const { userTrigger } = userSlice.actions
export default userSlice.reducer
