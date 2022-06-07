import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiLogin, apiVerify } from '../../Axios/Auth'

const initialState = { token: '', user: {}, verify: false }

export const login = createAsyncThunk('auth/login', async data => {
    try {
        const response = await apiLogin(data)
        return response.data
    } catch (e) {
        return e
    }
})
export const verify = createAsyncThunk('auth/verify', async (_, thunkAPI) => {
    try {
        const response = await apiVerify()
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue()
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        verifyFailed: (state, action) => {
            return initialState
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            const { user, token } = action.payload
            return {
                user,
                token,
                verify: true,
            }
        },
    },
})

export const { verifyFailed } = authSlice.actions
export default authSlice.reducer
