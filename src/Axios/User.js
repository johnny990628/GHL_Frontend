import Request from './APIConfig'

export const apiGetUsers = params => Request.get('/user', { params })
export const apiUpdateUser = (id, data) => Request.patch(`/user/${id}`, data)
export const apiDeleteUser = userID => Request.delete(`/user/${userID}`)
