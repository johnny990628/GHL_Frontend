import axios from 'axios'

const bloodRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiAddBlood = body => bloodRequest.post(`/blood`, body)
export const apiRemoveBlood = bloodNumber => bloodRequest.delete(`/blood/${bloodNumber}`)
