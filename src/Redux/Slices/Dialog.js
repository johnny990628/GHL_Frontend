import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetReportByReportID } from '../../Axios/Report'
import { tokenExpirationHandler } from '../../Utils/ErrorHandle'

const initialState = {
    patient: { isOpen: false, row: {} },
    report: { isOpen: false, row: { patient: {}, records: {}, reportID: '' } },
    department: { isOpen: false, row: {} },
    event: { isOpen: false, row: {} },
    mode: 'create',
    type: 'patient',
}

export const fetchReportByReportID = createAsyncThunk('dialog/fetchReportByReportID', async (reportID, thunkAPI) => {
    try {
        const response = await apiGetReportByReportID(reportID)
        return response.data
    } catch (e) {
        thunkAPI.dispatch(tokenExpirationHandler(e.response))
        return e
    }
})

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog: (state, action) => {
            const { row, type, mode } = action.payload
            state[type].isOpen = true
            state[type].row = row
            state.mode = mode
            state.type = type
        },
        closeDialog: (state, action) => {
            const { type } = action.payload
            state[type].isOpen = false
            state[type].row = initialState[type].row
        },
    },
    extraReducers: {
        [fetchReportByReportID.fulfilled]: (state, action) => {
            const { patient, user, records, createdAt, updatedAt, _id } = action.payload
            return {
                ...state,
                report: {
                    isOpen: true,
                    row: { patient, user, createdAt, updatedAt, records: [].concat(records).reverse(), reportID: _id },
                },
            }
        },
    },
})

export const { openDialog, closeDialog } = dialogSlice.actions

export default dialogSlice.reducer
