import axios from 'axios'

const userRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiGetUsers = params => userRequest.get('/user', { params })
export const apiDeleteUser = userID => userRequest.delete(`/user/${userID}`)
