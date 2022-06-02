import axios from 'axios'

const departmentRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiGetDepartments = params => departmentRequest.get('/department', { params })
