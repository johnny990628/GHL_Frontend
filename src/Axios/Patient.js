import axios from 'axios'

const patientRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiGetPatients = params => patientRequest.get('/patient', { params })
export const apiCreatePatient = patient => patientRequest.post('/patient', patient)
export const apiUpdatePatient = (id, data) => patientRequest.patch(`/patient/${id}`, data)
export const apiDeletePatient = id => patientRequest.delete(`/patient/${id}`)
export const apiCheckPatientExists = ({ id, blood }) => patientRequest.get('/exist', { params: { id, blood } })
