import { apiGetPatients } from '../../Axios/patient'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const patients = [
    {
        id: 'A131005438',
        blood: '012',
        name: '李柏勳',
        gender: '男',
        birth: '2001/6/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: true,
    },
    {
        id: 'P131005439',
        blood: '013',
        name: '李柏勳',
        gender: '男',
        birth: '2001/6/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: true,
    },
    {
        id: 'O131005437',
        blood: '014',
        name: '李柏勳',
        gender: '男',
        birth: '2001/6/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: false,
    },
    {
        id: 'Z131005437',
        blood: '015',
        name: '李柏勳',
        gender: '男',
        birth: '2001/6/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: true,
    },
    {
        id: 'Y131005437',
        blood: '016',
        name: '李柏勳',
        gender: '男',
        birth: '2001/6/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: false,
    },
    {
        id: 'G131005437',
        blood: '017',
        name: '李柏勳',
        gender: '男',
        birth: '2001/6/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: false,
    },
    {
        id: 'F131005437',
        blood: '018',
        name: '李柏勳',
        gender: '男',
        birth: '2001/6/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: true,
    },
    {
        id: 'E131005437',
        blood: '019',
        name: '李柏勳',
        gender: '男',
        birth: '2001/6/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: true,
    },
]

const initialState = { loading: false, data: [...patients], error: '' }

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
            state.data = state.data.filter(row => action.payload !== row.id)
        },
        updatePatient: (state, action) => {
            state.data = state.data.map(row => (row.id === action.payload.id ? action.payload : row))
        },
        addProcessing: (state, action) => {
            state.data = state.data.map(row => (row.id === action.payload.id ? { ...action.payload, processing: true } : row))
        },
        removeProcessing: (state, action) => {
            state.data = state.data.map(row => (row.id === action.payload.id ? { ...action.payload, processing: false } : row))
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

export const { addPatient, removePatient, updatePatient, addProcessing, removeProcessing } = patientsSlice.actions

export default patientsSlice.reducer
