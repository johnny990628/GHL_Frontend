import axios from 'axios'

const reportRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiCreateReport = body => reportRequest.post(`/report`, body)
export const apiUpdateReport = (patientID, reportID, body) => reportRequest.patch(`/report/${patientID}/${reportID}`, body)
