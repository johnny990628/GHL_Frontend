import { createSlice } from '@reduxjs/toolkit'

const initialState = { isOpen: false, title: '', text: '', icon: 'success' }

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        openAlert: (state, action) => {
            const { toastTitle, alertTitle, text, icon = 'success', type, event } = action.payload
            return {
                isOpen: true,
                alertTitle,
                toastTitle,
                text,
                icon,
                type,
                event,
            }
        },
        closeAlert: state => {
            return initialState
        },
    },
})

export const { openAlert, closeAlert } = alertSlice.actions

export default alertSlice.reducer
