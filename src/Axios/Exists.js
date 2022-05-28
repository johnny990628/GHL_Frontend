import axios from 'axios'

const existsRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiCheckExists = ({ type, value }) => existsRequest.get(`/exist/${type}`, { params: { value } })
