import { createSlice } from '@reduxjs/toolkit'

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: { isOpen: false },
    reducers: {
        openDashboard: state => {
            state.isOpen = true
        },
        closeDashboard: state => {
            state.isOpen = false
        },
    },
})

export const { openDashboard, closeDashboard } = dashboardSlice.actions

export default dashboardSlice.reducer
