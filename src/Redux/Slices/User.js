import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiDeleteUser, apiGetUsers, apiUpdateUser } from '../../Axios/User'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

export const fetchUser = createAsyncThunk('user/fetchUser', async (params, thunkAPI) => {
    try {
        const response = await apiGetUsers(params)
        const { results, count } = response.data
        return { results, count, page: Math.ceil(count / params.limit) }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, data }, thunkAPI) => {
    try {
        await apiUpdateUser(id, data)
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (userID, thunkAPI) => {
    try {
        const response = await apiDeleteUser(userID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})
const initialState = { results: [], count: 0, page: 1, loading: false }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userTrigger: (state, action) => ({ ...state, count: -1 }),
    },
    extraReducers: {
        [fetchUser.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            }
        },
        [fetchUser.fulfilled]: (state, action) => {
            return {
                ...action.payload,
                loading: false,
            }
        },
        [fetchUser.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
        // [updateUser.fulfilled]: (state, action) => {
        //     return {
        //         ...state,
        //         count: -1,
        //     }
        // },
        // [deleteUser.fulfilled]: (state, action) => {
        //     return {
        //         ...state,
        //         count: state.count - 1,
        //     }
        // },
    },
})
export const { userTrigger } = userSlice.actions
export default userSlice.reducer
