import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiUpdateReport } from '../../Axios/Report'
import { apiDeleteScheduleAndBloodAndReport, apiUpdateScheduleStatus } from '../../Axios/Schedule'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

const initialState = {
    create: {
        liver: [],
        gallbladder: [],
        kidney: [],
        pancreas: [],
        spleen: [],
        suggestion: [],
    },
    edit: {
        liver: [],
        gallbladder: [],
        kidney: [],
        pancreas: [],
        spleen: [],
        suggestion: [],
    },
}

export const createReport = createAsyncThunk('reportForm/createReport', async ({ patientID, scheduleID, reportID, data }, thunkAPI) => {
    try {
        const response = await apiUpdateReport({ reportID, data })
        // await apiDeleteScheduleAndBloodAndReport(patientID)
        await apiUpdateScheduleStatus({ patientID, scheduleID, status: 'finish' })
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

export const updateReport = createAsyncThunk('reportForm/updateReport', async ({ reportID, data }, thunkAPI) => {
    try {
        const response = await apiUpdateReport({ reportID, data })
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return thunkAPI.rejectWithValue()
    }
})

const reportFormSlice = createSlice({
    name: 'reportForm',
    initialState,
    reducers: {
        addCancer: (state, action) => {
            const { organ, name, type, value, mode } = action.payload
            state[mode][organ].find(s => s.name === name) //if has the same name
                ? (state[mode][organ] = [...state[mode][organ].filter(s => s.name !== name), { name, type, value }]) //replace the name with value
                : (state[mode][organ] = [...state[mode][organ], { name, type, value }]) //or add the new one
        },
        removeCancer: (state, action) => {
            const { organ, name, mode } = action.payload
            state[mode][organ] = state[mode][organ].filter(c => c.name !== name)
        },
        clearCancer: (state, action) => {
            const { organ, mode } = action.payload
            state[mode][organ] = []
        },
        fillReport: (state, action) => {
            const { report } = action.payload
            return {
                ...state,
                edit: { ...report },
            }
        },
        resetReport: (state, action) => {
            const { mode } = action.payload
            state[mode] = {
                liver: [],
                gallbladder: [],
                kidney: [],
                pancreas: [],
                spleen: [],
                suggestion: [],
            }
        },
    },
    extraReducers: {
        [createReport.fulfilled]: (state, action) => {
            return initialState
        },
        [updateReport.fulfilled]: (state, action) => {
            return initialState
        },
    },
})

export const { addCancer, removeCancer, clearCancer, fillReport, resetReport } = reportFormSlice.actions

export default reportFormSlice.reducer
