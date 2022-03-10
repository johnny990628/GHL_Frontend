import { createSlice } from '@reduxjs/toolkit'

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: { isOpen: false, row: {} },
    reducers: {
        openDialog: (state, action) => {
            state.isOpen = true
            state.row = action.payload
        },
        closeDialog: state => {
            state.isOpen = false
        },
    },
})

export const { openDialog, closeDialog } = dialogSlice.actions

export default dialogSlice.reducer
