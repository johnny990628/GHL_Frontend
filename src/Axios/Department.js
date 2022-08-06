import Request from './APIConfig'

export const apiGetDepartments = params => Request.get('/department', { params })
export const apiCreateDepartment = data => Request.post('/department', data)
export const apiDeleteDepartment = departmentID => Request.delete(`/department/${departmentID}`)
export const apiUpdateDepartment = (departmentID, data) => Request.patch(`/department/${departmentID}`, data)
