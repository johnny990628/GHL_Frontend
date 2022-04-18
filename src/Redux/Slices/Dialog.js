import { createSlice } from '@reduxjs/toolkit'

const initialState = { patient: { isOpen: false, row: {} }, report: { isOpen: false, row: { patient: {}, reports: {} } } }

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
})

export const { openDialog, closeDialog } = dialogSlice.actions

export default dialogSlice.reducer
