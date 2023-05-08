import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiUpdateReport } from '../../Axios/Report'
import { apiDeleteScheduleAndBloodAndReport, apiUpdateScheduleStatus } from '../../Axios/Schedule'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

const initialState = {
    liver: [],
    gallbladder: [],
    kidney: [],
    pancreas: [],
    spleen: [],
    suggestion: [],
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
            const { organ, name, type, value } = action.payload
            state[organ].find(s => s.name === name) //if has the same name
                ? (state[organ] = [...state[organ].filter(s => s.name !== name), { name, type, value }]) //replace the name with value
                : (state[organ] = [...state[organ], { name, type, value }]) //or add the new one
        },
        removeCancer: (state, action) => {
            const { organ, name } = action.payload
            state[organ] = state[organ].filter(c => c.name !== name)
        },
        clearCancer: (state, action) => {
            const { organ } = action.payload
            state[organ] = []
        },
        fillReport: (state, action) => {
            const { report } = action.payload
            return {
                ...report,
            }
        },
        resetReport: (state, action) => {
            return initialState
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
