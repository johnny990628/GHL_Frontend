import axios from 'axios'

const scheduleRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiAddSchedule = body => scheduleRequest.post('/schedule', body)
export const apiRemoveSchedule = id => scheduleRequest.delete(`/schedule/${id}`)
