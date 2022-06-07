import Request from './APIConfig'

export const apiCreateReport = body => Request.post(`/report`, body)
export const apiUpdateReport = ({ reportID, data }) => Request.patch(`/report/${reportID}`, data)
export const apiDeleteReport = reportID => Request.delete(`/report/${reportID}`)

export const apiGetReports = params => Request.get('/report', { params })
export const apiGetReportByReportID = reportID => Request.get(`/report/${reportID}`)
