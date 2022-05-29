import axios from 'axios'

const countRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiGetCounts = () => countRequest.get(`/count`)
