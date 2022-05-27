import axios from 'axios'

const scheduleRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiGetSchdules = ({ procedureCode }) => scheduleRequest.get('/schedule', { params: { procedureCode } })
export const apiAddSchedule = body => scheduleRequest.post('/schedule', body)
export const apiRemoveSchedule = id => scheduleRequest.delete(`/schedule/${id}`)
export const apiDeleteScheduleAndBloodAndReport = patientID => scheduleRequest.delete('/schedule', { data: { patientID } })
