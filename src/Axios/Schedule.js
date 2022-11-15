import Request from './APIConfig'
export const apiGetSchdules = ({ procedureCode }) => Request.get('/schedule', { params: { procedureCode } })
export const apiAddSchedule = body => Request.post('/schedule', body)
export const apiUpdateSchedule = (id, body) => Request.patch(`/schedule/${id}`, body)
export const apiRemoveSchedule = id => Request.delete(`/schedule/${id}`)
export const apiDeleteScheduleAndBloodAndReport = patientID => Request.delete('/schedule', { data: { patientID } })
export const apiUpdateScheduleStatus = body => Request.patch('/schedule', body)
