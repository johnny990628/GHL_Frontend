import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: { isOpen: false, message: '' },
    reducers: {
        openSnackbar: (state, action) => {
            state.isOpen = true
            state.message = action.payload
        },
        closeSnackbar: state => {
            state.isOpen = false
        },
    },
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer
