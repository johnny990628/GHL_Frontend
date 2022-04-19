import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    create: {
        liver: [],
        gallbladder: [],
        kidney: [],
        pancreas: [],
        spleen: [],
        suggestion: [],
    },
    edit: {
        liver: [],
        gallbladder: [],
        kidney: [],
        pancreas: [],
        spleen: [],
        suggestion: [],
    },
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        addCancer: (state, action) => {
            const { organ, name, type, value, mode } = action.payload
            state[mode][organ].find(s => s.name === name) //if has the same name
                ? (state[mode][organ] = [...state[mode][organ].filter(s => s.name !== name), { name, type, value }]) //replace the name with value
                : (state[mode][organ] = [...state[mode][organ], { name, type, value }]) //or add the new one
        },
        removeCancer: (state, action) => {
            const { organ, name, mode } = action.payload
            state[mode][organ] = state[mode][organ].filter(c => c.name !== name)
        },
        clearCancer: (state, action) => {
            const { organ, mode } = action.payload
            state[mode][organ] = []
        },
        fillReport: (state, action) => {
            const { report } = action.payload
            return {
                ...state,
                edit: { ...report },
            }
        },
        resetReport: (state, action) => {
            const { mode } = action.payload
            state[mode] = {
                liver: [],
                gallbladder: [],
                kidney: [],
                pancreas: [],
                spleen: [],
                suggestion: [],
            }
        },
    },
})

export const { addCancer, removeCancer, clearCancer, fillReport, resetReport } = reportSlice.actions

export default reportSlice.reducer
