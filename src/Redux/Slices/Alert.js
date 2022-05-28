import { createSlice } from '@reduxjs/toolkit'

const initialState = { isOpen: false, title: '', text: '', icon: 'success' }

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        openAlert: (state, action) => {
            const { toastTitle, alertTitle, text, icon = 'success', type, event, preConfirm } = action.payload
            return {
                isOpen: true,
                alertTitle,
                toastTitle,
                text,
                icon,
                type,
                event,
                preConfirm,
            }
        },
        closeAlert: state => {
            return initialState
        },
    },
})

export const { openAlert, closeAlert } = alertSlice.actions

export default alertSlice.reducer
