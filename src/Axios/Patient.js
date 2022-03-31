import axios from 'axios'

const patientRequest = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' })

export const apiGetPatients = data => patientRequest.get('/users', data)
