import Request from './APIConfig'
export const apiGetSchdules = ({ procedureCode }) => Request.get('/schedule', { params: { procedureCode } })
export const apiAddSchedule = body => Request.post('/schedule', body)
export const apiRemoveSchedule = id => Request.delete(`/schedule/${id}`)
export const apiDeleteScheduleAndBloodAndReport = patientID => Request.delete('/schedule', { data: { patientID } })
