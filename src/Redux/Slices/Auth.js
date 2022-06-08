import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiLogin, apiVerify } from '../../Axios/Auth'

const initialState = { token: '', user: {}, verify: false }

export const login = createAsyncThunk('auth/login', async ({ username, password, remember }, thunkAPI) => {
    try {
        const response = await apiLogin({ username, password })
        remember && localStorage.setItem('isLoggedIn', response.data.token ? true : false)
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
            localStorage.removeItem('isLoggedIn')
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
