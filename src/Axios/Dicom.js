import Request from './APIConfig'

export const apiGetDicom = params => Request.get('/dicom', { params })
