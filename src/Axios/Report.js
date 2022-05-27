import axios from 'axios'

const reportRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
})

export const apiCreateReport = body => reportRequest.post(`/report`, body)
export const apiUpdateReport = ({ reportID, data }) => reportRequest.patch(`/report/${reportID}`, data)
