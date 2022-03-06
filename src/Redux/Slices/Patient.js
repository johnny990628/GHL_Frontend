import { randomTraderName } from '@mui/x-data-grid-generator'
import { apiGetPatients } from '../../Axios/Patient'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = { loading: false, data: [], error: '' }
// const initialState = [
//     { id: 'A000000000', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000001', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000002', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000003', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000004', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000005', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000006', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000007', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000008', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000009', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
//     { id: 'A000000010', name: randomTraderName(), birth: '2022/2/27', time: '2022/2/28', contact: '0987-587-987' },
// ];

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
    const response = await apiGetPatients()
    return response.data
})

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        addPatient: (state, action) => {
            state.data.push(action.payload)
        },
        removePatient: (state, action) => {
            state.data = state.data.filter(data => !action.payload.includes(data.id))
        },
    },
    extraReducers: {
        [fetchPatients.pending]: (state, action) => {
            state.loading = true
        },
        [fetchPatients.fulfilled]: (state, action) => {
            state.loading = false
            state.data = [...state.data, ...action.payload]
        },
        [fetchPatients.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export const { addPatient, removePatient } = patientsSlice.actions

export default patientsSlice.reducer
