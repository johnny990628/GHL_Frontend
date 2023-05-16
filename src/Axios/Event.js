import Request from './APIConfig'

export const apiCreateEvent = body => Request.post(`/event`, body)
export const apiUpdateEvent = (eventID, data) => Request.patch(`/event/${eventID}`, data)
export const apiDeleteEvent = eventID => Request.delete(`/event/${eventID}`)

export const apiGetEvents = params => Request.get('/event', { params })
export const apiGetEventByEventID = eventID => Request.get(`/event/${eventID}`)

export const apiRegisterEvent = eventID => Request.post(`/event/${eventID}`)
