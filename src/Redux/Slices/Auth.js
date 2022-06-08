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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
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

export const { logout } = authSlice.actions
export default authSlice.reducer
