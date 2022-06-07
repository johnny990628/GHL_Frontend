import Request from './APIConfig'

export const apiGetPatients = params => Request.get('/patient', { params })
export const apiCreatePatient = patient => Request.post('/patient', patient)
export const apiUpdatePatient = (id, data) => Request.patch(`/patient/${id}`, data)
export const apiDeletePatient = id => Request.delete(`/patient/${id}`)
export const apiDeletePatientAndBloodAndSchedule = patientID => Request.delete('/patient', { data: { patientID } })
