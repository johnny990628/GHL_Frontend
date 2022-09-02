import Request from './APIConfig'

export const apiGetStats = params => Request.get('/stats', { params })
export const apiGetStatsByDepartmentID = (id, params) => Request.get(`/stats/${id}`, { params })
