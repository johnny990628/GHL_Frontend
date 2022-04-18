import { apiCreatePatient, apiDeletePatient, apiGetPatients, apiUpdatePatient, apiCreateReport, apiUpdateReport } from '../../Axios/Patient'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const patients = [
    {
        id: 'A131005438',
        blood: '012',
        name: '李柏勳',
        gender: '男',
        birth: new Date(),
        phone: '0918189393',
        department: 'cylab',
        createdAt: new Date(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: true,
        reports: [],
    },
    {
        id: 'P131005439',
        blood: '013',
        name: '李柏勳',
        gender: '男',
        birth: new Date(),
        phone: '0918189393',
        department: 'cylab',
        createdAt: new Date(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: true,
        reports: [],
    },
    {
        id: 'O131005437',
        blood: '014',
        name: '李柏勳',
        gender: '男',
        birth: new Date(),
        phone: '0918189393',
        department: 'cylab',
        createdAt: new Date(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: false,
        reports: [],
    },
    {
        id: 'Z131005437',
        blood: '015',
        name: '李柏勳',
        gender: '男',
        birth: new Date(),
        phone: '0918189393',
        department: 'cylab',
        createdAt: new Date(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: true,
        reports: [],
    },
    {
        id: 'Y131005437',
        blood: '016',
        name: '李柏勳',
        gender: '男',
        birth: new Date(),
        phone: '0918189393',
        department: 'cylab',
        createdAt: new Date(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: false,
        reports: [],
    },
    {
        id: 'G131005437',
        blood: '017',
        name: '李柏勳',
        gender: '男',
        birth: new Date(),
        phone: '0918189393',
        department: 'cylab',
        createdAt: new Date(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: false,
        reports: [],
    },
    {
        id: 'F131005437',
        blood: '018',
        name: '李柏勳',
        gender: '男',
        birth: new Date(),
        phone: '0918189393',
        department: 'cylab',
        createdAt: new Date(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: true,
        reports: [],
    },
    {
        id: 'E131005437',
        blood: '019',
        name: '李柏勳',
        gender: '男',
        birth: new Date(),
        phone: '0918189393',
        department: 'cylab',
        createdAt: new Date(),
        address: '台北市北投區公館路279巷6號3樓',
        processing: true,
        reports: [],
    },
]

const initialState = { loading: false, data: [...patients], error: '' }

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
    try {
        const response = await apiGetPatients()

        return response.data
    } catch (e) {
        return e
    }
})

export const createPatient = createAsyncThunk('patients/createPatient', async ({ patient }) => {
    try {
        const response = await apiCreatePatient(patient)
        return response.data
    } catch (e) {
        return e
    }
})

export const updatePatient = createAsyncThunk('patients/updatePatient', async ({ patient }) => {
    try {
        const response = await apiUpdatePatient(patient.id, patient)
        return response.data
    } catch (e) {
        return e
    }
})

export const deletePatient = createAsyncThunk('patients/deletePatient', async ({ id }) => {
    try {
        const response = await apiDeletePatient(id)
        return response.data
    } catch (e) {
        return e
    }
})

export const addProcessing = createAsyncThunk('patients/addProcessing', async ({ patient }) => {
    try {
        const response = await apiUpdatePatient(patient.id, { processing: true })
        return response.data
    } catch (e) {
        return e
    }
})

export const removeProcessing = createAsyncThunk('patients/removeProcessing', async ({ patient }) => {
    try {
        const response = await apiUpdatePatient(patient.id, { processing: false })
        return response.data
    } catch (e) {
        return e
    }
})

export const addReport = createAsyncThunk('patients/addReport', async ({ patient, report }) => {
    try {
        const response = await apiCreateReport(patient.id, { report })
        return response.data
    } catch (e) {
        return e
    }
})

export const updateReport = createAsyncThunk('patients/updateReport', async ({ patient, reportID, report }) => {
    try {
        const response = await apiUpdateReport(patient.id, reportID, { report })
        return response.data
    } catch (e) {
        return e
    }
})

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        // addPatient: (state, action) => {
        //     const { patient } = action.payload
        //     state.data = [...state.data, patient]
        // },
        // removePatient: (state, action) => {
        //     const { id } = action.payload
        //     state.data = state.data.filter(row => row.id !== id)
        // },
        // updatePatient: (state, action) => {
        //     const { patient } = action.payload
        //     state.data = state.data.map(row => (row.id === patient.id ? patient : row))
        // },
        // addProcessing: (state, action) => {
        //     const { patient } = action.payload
        //     state.data = state.data.map(row => (row.id === patient.id ? { ...row, processing: true } : row))
        // },
        // removeProcessing: (state, action) => {
        //     const { patient } = action.payload
        //     state.data = state.data.map(row => (row.id === patient.id ? { ...row, processing: false } : row))
        // },
        // addReport: (state, action) => {
        //     const { patient, report } = action.payload
        //     state.data = state.data.map(row => (row.id === patient.id ? { ...row, reports: [...row.reports, report] } : row))
        // },
    },
    extraReducers: {
        [fetchPatients.pending]: (state, action) => {
            state.loading = true
        },
        [fetchPatients.fulfilled]: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        [fetchPatients.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        [createPatient.fulfilled]: (state, action) => {
            const patient = action.payload
            state.loading = false
            state.data = [...state.data, patient]
        },
        [updatePatient.fulfilled]: (state, action) => {
            const patient = action.payload
            state.loading = false
            state.data = state.data.map(row => (row.id === patient.id ? patient : row))
        },
        [deletePatient.fulfilled]: (state, action) => {
            const { id } = action.payload
            state.loading = false
            state.data = state.data.filter(row => row.id !== id)
        },
        [addProcessing.fulfilled]: (state, action) => {
            const patient = action.payload
            state.loading = false
            state.data = state.data.map(row => (row.id === patient.id ? patient : row))
        },
        [removeProcessing.fulfilled]: (state, action) => {
            const patient = action.payload
            state.loading = false
            state.data = state.data.map(row => (row.id === patient.id ? patient : row))
        },
        [addReport.fulfilled]: (state, action) => {
            const patient = action.payload
            state.loading = false
            state.data = state.data.map(row => (row.id === patient.id ? patient : row))
        },
        [updateReport.fulfilled]: (state, action) => {
            const patient = action.payload
            state.loading = false
            state.data = state.data.map(row => (row.id === patient.id ? patient : row))
        },
    },
})

export default patientsSlice.reducer
