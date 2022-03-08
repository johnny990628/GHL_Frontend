import { apiGetPatients } from '../../Axios/Patient'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const patients = [
    {
        id: 'A131005438',
        name: '李柏勳',
        gender: '男',
        birth: '2001/06/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
    },
    {
        id: 'P131005439',
        name: '李柏勳',
        gender: '男',
        birth: '2001/06/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
    },
    {
        id: 'O131005437',
        name: '李柏勳',
        gender: '男',
        birth: '2001/06/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
    },
    {
        id: 'Z131005437',
        name: '李柏勳',
        gender: '男',
        birth: '2001/06/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
    },
    {
        id: 'Y131005437',
        name: '李柏勳',
        gender: '男',
        birth: '2001/06/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
    },
    {
        id: 'G131005437',
        name: '李柏勳',
        gender: '男',
        birth: '2001/06/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
    },
    {
        id: 'F131005437',
        name: '李柏勳',
        gender: '男',
        birth: '2001/06/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
    },
    {
        id: 'E131005437',
        name: '李柏勳',
        gender: '男',
        birth: '2001/06/28',
        phone: '0918189393',
        department: 'cylab',
        updateTime: new Date().toLocaleString(),
        address: '台北市北投區公館路279巷6號3樓',
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
