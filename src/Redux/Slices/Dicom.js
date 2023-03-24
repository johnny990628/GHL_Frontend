import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { tokenExpirationHandler } from '../../Utils/ErrorHandle'
import { apiGetDicom } from './../../Axios/Dicom'

export const fetchDicom = createAsyncThunk('dicom/fetchDicom', async (params, thunkAPI) => {
    try {
        const response = await apiGetDicom(params)
        const { results, count } = response.data
        return { results, count, page: Math.ceil(count / params.limit) }
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const initialState = { results: [], count: 0, page: 1, loading: false }
const dicomSlice = createSlice({
    name: 'dicom',
    initialState,
    reducers: {
        dicomTrigger: (state, action) => ({ ...state, count: -1 }),
    },
    extraReducers: {
        [fetchDicom.pending]: (state, action) => {
            return {
                ...state,
                loading: true,
            }
        },
        [fetchDicom.fulfilled]: (state, action) => {
            return {
                ...action.payload,
                loading: false,
            }
        },
        [fetchDicom.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
            }
        },
    },
})
export const { dicomTrigger } = dicomSlice.actions
export default dicomSlice.reducer
