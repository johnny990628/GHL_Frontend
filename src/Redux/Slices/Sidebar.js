import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: { isOpen: true },
    reducers: {
        openSidebar: state => {
            state.isOpen = true
        },
        closeSidebar: state => {
            state.isOpen = false
        },
    },
})

export const { openSidebar, closeSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
