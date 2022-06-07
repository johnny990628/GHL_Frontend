import Request from './APIConfig'

export const apiAddBlood = body => Request.post(`/blood`, body)
export const apiRemoveBlood = bloodNumber => Request.delete(`/blood/${bloodNumber}`)
