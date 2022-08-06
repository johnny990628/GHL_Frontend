import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiCreateDepartment, apiDeleteDepartment, apiGetDepartments, apiUpdateDepartment } from '../../Axios/Department'

import { openAlert } from './Alert'
import { logout } from './Auth'

export const fetchDepartment = createAsyncThunk('department/fetchDepartment', async (params, thunkAPI) => {
    try {
        const response = await apiGetDepartments(params)
        const { results, count } = response.data
        return { results, count, page: Math.ceil(count / params.limit) }
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

export const createDepartment = createAsyncThunk('department/createDepartment', async ({ name, address, active }, thunkAPI) => {
    try {
        const response = await apiCreateDepartment({ name, address, active })
        thunkAPI.dispatch(
            openAlert({
                toastTitle: '新增成功',
                text: `${name} - ${address}`,
                icon: 'success',
            })
        )
        return response.data
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})
export const deleteDepartment = createAsyncThunk('department/deleteDepartment', async (departmentID, thunkAPI) => {
    try {
        const response = await apiDeleteDepartment(departmentID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

export const activeDepartment = createAsyncThunk('department/activeDepartment', async ({ departmentID, active }, thunkAPI) => {
    try {
        const response = await apiUpdateDepartment(departmentID, { active })
        return response.data
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { results: [], count: 0, page: 1 }
const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        departmentTrigger: (state, action) => ({ ...state, count: 0 }),
    },
    extraReducers: {
        [fetchDepartment.fulfilled]: (state, action) => {
            return {
                ...action.payload,
            }
        },
        [fetchDepartment.rejected]: (state, action) => {
            return initialState
        },
        [createDepartment.fulfilled]: (state, action) => {
            return {
                ...state,
                count: state.count + 1,
            }
        },
        [deleteDepartment.fulfilled]: (state, action) => {
            return {
                ...state,
                count: state.count - 1,
            }
        },
        [activeDepartment.fulfilled]: (state, action) => {
            return {
                ...state,
                count: state.count - 1,
            }
        },
    },
})
export const { departmentTrigger } = departmentSlice.actions
export default departmentSlice.reducer
