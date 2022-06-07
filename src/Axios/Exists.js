import Request from './APIConfig'
export const apiCheckExists = ({ type, value }) => Request.get(`/exist/${type}`, { params: { value } })
