import Request from './APIConfig'

export const apiAddWorklist = (patientID) => Request.get('/worklist/' + patientID)