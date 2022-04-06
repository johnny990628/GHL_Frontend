import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    liver: [],
    gallbladder: [],
    kidney: [],
    pancreas: [],
    spleen: [],
    suggestion: [],
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        addCancer: (state, action) => {
            const { organ, name, type, value } = action.payload
            state[organ].find(s => s.name === name) //if has the same name
                ? (state[organ] = [...state[organ].filter(s => s.name !== name), { name, type, value }]) //replace the name with value
                : (state[organ] = [...state[organ], { name, type, value }]) //or add the new one
        },
        removeCancer: (state, action) => {
            const { organ, name } = action.payload
            state[organ] = state[organ].filter(c => c.name !== name)
        },
        clearCancer: (state, action) => {
            const { organ } = action.payload
            state[organ] = []
        },
        resetReport: (state, action) => {
            return initialState
        },
    },
})

export const { addCancer, removeCancer, clearCancer, resetReport } = reportSlice.actions

export default reportSlice.reducer
