import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetReportByReportID } from '../../Axios/Report'

const initialState = { patient: { isOpen: false, row: {} }, report: { isOpen: false, row: { patient: {}, records: {}, reportID: '' } } }

export const fetchReport = createAsyncThunk('dialog/fetchReport', async reportID => {
    try {
        const response = await apiGetReportByReportID(reportID)
        return response.data
    } catch (e) {
        return e
    }
})

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog: (state, action) => {
            const { row, type } = action.payload
            state[type].isOpen = true
            state[type].row = row
        },
        closeDialog: (state, action) => {
            const { type } = action.payload
            state[type].isOpen = false
            state[type].row = initialState[type].row
        },
    },
    extraReducers: {
        [fetchReport.fulfilled]: (state, action) => {
            const { patient, records, _id } = action.payload
            return {
                ...state,
                report: {
                    isOpen: true,
                    row: { patient, records: [].concat(records).reverse(), reportID: _id },
                },
            }
        },
    },
})

export const { openDialog, closeDialog } = dialogSlice.actions

export default dialogSlice.reducer
