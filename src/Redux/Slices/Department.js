import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiCreateDepartment, apiDeleteDepartment, apiGetDepartments } from '../../Axios/Department'
import { apiGetReports } from '../../Axios/Report'
import { apiGetUsers } from '../../Axios/User'
import { openAlert } from './Alert'
import { logout } from './Auth'

export const fetchDepartment = createAsyncThunk('report/fetchDepartment', async (params, thunkAPI) => {
    try {
        const response = await apiGetDepartments(params)
        const { results, count } = response.data
        return { results, count, page: Math.ceil(count / params.limit) }
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

export const createDepartment = createAsyncThunk('report/createDepartment', async ({ name, address }, thunkAPI) => {
    try {
        const response = await apiCreateDepartment({ name, address })
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
export const deleteDepartment = createAsyncThunk('report/deleteDepartment', async (departmentID, thunkAPI) => {
    try {
        const response = await apiDeleteDepartment(departmentID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(logout())
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { results: [], count: 0, page: 1 }
const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {},
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
    },
})

export default reportSlice.reducer
