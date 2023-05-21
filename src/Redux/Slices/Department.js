import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiCreateDepartment, apiDeleteDepartment, apiGetDepartments, apiUpdateDepartment } from '../../Axios/Department'

import { openAlert } from './Alert'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

export const fetchDepartment = createAsyncThunk('department/fetchDepartment', async (params, thunkAPI) => {
    try {
        const response = await apiGetDepartments(params)
        const { results, count } = response.data
        return { results, count, page: Math.ceil(count / params.limit) }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
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
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const updateDepartment = createAsyncThunk('department/updateDepartment', async ({ departmentID, data }, thunkAPI) => {
    try {
        const response = await apiUpdateDepartment(departmentID, data)
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

export const deleteDepartment = createAsyncThunk('department/deleteDepartment', async (departmentID, thunkAPI) => {
    try {
        const response = await apiDeleteDepartment(departmentID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const activeDepartment = createAsyncThunk('department/activeDepartment', async ({ departmentID, active }, thunkAPI) => {
    try {
        const response = await apiUpdateDepartment(departmentID, { active })
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { results: [], count: 0, page: 1, loading: false }
const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        departmentTrigger: (state, action) => ({ ...state, count: -1 }),
    },
    extraReducers: {
        [fetchDepartment.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            }
        },
        [fetchDepartment.fulfilled]: (state, action) => {
            return {
                ...action.payload,
                loading: false,
            }
        },
        [fetchDepartment.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
    },
})
export const { departmentTrigger } = departmentSlice.actions
export default departmentSlice.reducer
