import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetDepartments } from '../../Axios/Department'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

export const fetchDepartments4List = createAsyncThunk('department4list/fetchDepartments4List', async (_, thunkAPI) => {
    try {
        const departments = await apiGetDepartments({ limit: 100, offset: 0 })
        return { departments: departments.data.results }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { departments: [] }
const department4ListSlice = createSlice({
    name: 'department4list',
    initialState,
    extraReducers: {
        [fetchDepartments4List.pending]: (state, action) => {
            return {
                ...state,
            }
        },
        [fetchDepartments4List.fulfilled]: (state, action) => {
            return {
                ...action.payload,
            }
        },
        [fetchDepartments4List.rejected]: (state, action) => {
            return {
                ...state,
            }
        },
    },
})

export default department4ListSlice.reducer
