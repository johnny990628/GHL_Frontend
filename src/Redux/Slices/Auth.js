import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiLogin, apiLogout, apiRegister, apiVerify } from '../../Axios/Auth'

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

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        const response = await apiLogout()
        localStorage.removeItem('isLoggedIn')
        return response.data
    } catch (e) {
        return e
    }
})

export const register = createAsyncThunk('auth/register', async ({ username, password, name }, thunkAPI) => {
    try {
        const response = await apiRegister({ username, password, name })
        return response.data
    } catch (e) {
        return e
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fillAuthState: (state, action) => {
            const { token, user } = action.payload
            return {
                token,
                user,
                verify: true,
            }
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
        [logout.fulfilled]: (state, action) => {
            return initialState
        },
        [register.fulfilled]: (state, action) => {
            return initialState
        },
    },
})

export const { fillAuthState } = authSlice.actions
export default authSlice.reducer
