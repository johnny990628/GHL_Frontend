import axios from 'axios'

const scheduleRequest = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' })

export const apiGetSchedule = data => scheduleRequest.get('/user', data)
