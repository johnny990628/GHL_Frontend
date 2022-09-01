import { ConstructionOutlined } from '@mui/icons-material'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiLogin, apiLogout, apiRegister } from '../../Axios/Auth'
import { openAlert } from './Alert'

const initialState = { token: '', user: {}, verify: false }

export const login = createAsyncThunk('auth/login', async ({ username, password, remember }, thunkAPI) => {
    try {
        const response = await apiLogin({ username, password })
        remember && localStorage.setItem('isLoggedIn', response.data.token ? true : false)
        thunkAPI.dispatch(
            openAlert({
                toastTitle: '登入成功',
                text: `歡迎 ${response.data.user.name}`,
                icon: 'success',
            })
        )
        return response.data
    } catch (e) {
        thunkAPI.dispatch(
            openAlert({
                toastTitle: '登入失敗',
                text: e.response.data.message,
                icon: 'error',
            })
        )
        return thunkAPI.rejectWithValue()
    }
})

export const logout = createAsyncThunk('auth/logout', async (isTokenExpiration, thunkAPI) => {
    try {
        const response = await apiLogout()
        localStorage.removeItem('isLoggedIn')
        thunkAPI.dispatch(
            openAlert({
                toastTitle: isTokenExpiration ? '登入憑證到期，請重新登入' : '已登出',
                icon: 'warning',
            })
        )
        return response.data
    } catch (e) {
        return e
    }
})

export const register = createAsyncThunk('auth/register', async ({ username, password, name }, thunkAPI) => {
    try {
        const response = await apiRegister({ username, password, name })

        thunkAPI.dispatch(
            openAlert({
                toastTitle: '註冊成功',
                text: `請等待管理員認證`,
                icon: 'success',
            })
        )
        return response.data
    } catch (e) {
        thunkAPI.dispatch(
            openAlert({
                toastTitle: '註冊失敗',
                text: '使用者已存在',
                icon: 'error',
            })
        )
        return thunkAPI.rejectWithValue()
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
        [login.rejected]: (state, action) => {
            return initialState
        },
        [logout.fulfilled]: (state, action) => {
            return initialState
        },
        [register.fulfilled]: (state, action) => {
            return initialState
        },
        [register.rejected]: (state, action) => {
            return initialState
        },
    },
})

export const { fillAuthState } = authSlice.actions
export default authSlice.reducer
