import { apiGetPatients } from '../../Axios/Patient'
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
        reports: [],
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
        reports: [],
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
        reports: [],
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
        reports: [],
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
        reports: [],
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
        reports: [],
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
        reports: [],
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
        reports: [],
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
            const { patient } = action.payload
            state.data = [...state.data, patient]
        },
        removePatient: (state, action) => {
            const { id } = action.payload
            state.data = state.data.filter(row => row.id !== id)
        },
        updatePatient: (state, action) => {
            const { patient } = action.payload
            state.data = state.data.map(row => (row.id === patient.id ? patient : row))
        },
        addProcessing: (state, action) => {
            const { patient } = action.payload
            state.data = state.data.map(row => (row.id === patient.id ? { ...row, processing: true } : row))
        },
        removeProcessing: (state, action) => {
            const { patient } = action.payload
            state.data = state.data.map(row => (row.id === patient.id ? { ...row, processing: false } : row))
        },
        addReport: (state, action) => {
            const { patient, report } = action.payload
            state.data = state.data.map(row => (row.id === patient.id ? { ...row, reports: [...row.reports, report] } : row))
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

export const { addPatient, removePatient, updatePatient, addProcessing, removeProcessing, addReport } = patientsSlice.actions

export default patientsSlice.reducer
