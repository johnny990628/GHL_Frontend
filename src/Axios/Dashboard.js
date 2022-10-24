import Request from './APIConfig'

export const apiGetDashboard = params => Request.get('/dashboard', { params })
export const apiGetDashboardByDepartmentID = (id, params) => Request.get(`/dashboard/${id}`, { params })
