import axios from 'axios'

const patientRequest = axios.create({
    baseURL: 'http://localhost:3080/ghl/api',
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiGetPatients = () => patientRequest.get('/patient')
export const apiCreatePatient = patient => patientRequest.post('/patient', patient)
export const apiUpdatePatient = patient => patientRequest.patch(`/patient/${patient.id}`, patient)
export const apiDeletePatient = id => patientRequest.delete(`/patient/${id}`)
