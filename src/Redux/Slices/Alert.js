import { createSlice } from '@reduxjs/toolkit'

const initialState = { isOpen: false, title: '', text: '', icon: 'success' }

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        openAlert: (state, action) => {
            const { title, text, icon = 'success', isConfirm = false, event } = action.payload
            return {
                isOpen: true,
                title,
                text,
                icon,
                isConfirm,
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
