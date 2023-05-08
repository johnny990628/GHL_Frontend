import Request from './APIConfig'
export const apiGetSchdules = params => Request.get('/schedule', { params })
export const apiAddSchedule = body => Request.post('/schedule', body)
export const apiUpdateSchedule = (id, body) => Request.patch(`/schedule/${id}`, body)
export const apiRemoveSchedule = id => Request.delete(`/schedule/${id}`)
export const apiDeleteScheduleAndBloodAndReport = scheduleID => Request.delete('/schedule', { data: { scheduleID } })
export const apiUpdateScheduleStatus = body => Request.patch('/schedule', body)
