import { createSlice } from '@reduxjs/toolkit'

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: { patient: { isOpen: false, row: {} }, report: { isOpen: false, row: { patient: {}, report: {} } } },
    reducers: {
        openDialog: (state, action) => {
            const { row, type } = action.payload
            state[type].isOpen = true
            state[type].row = row
        },
        closeDialog: (state, action) => {
            const { type } = action.payload
            state[type].isOpen = false
        },
    },
})

export const { openDialog, closeDialog } = dialogSlice.actions

export default dialogSlice.reducer
