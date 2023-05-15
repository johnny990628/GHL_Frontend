import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { departmentTrigger } from '../Redux/Slices/Department'
import { patientTrigger } from '../Redux/Slices/Patient'
import { reportTrigger } from '../Redux/Slices/Report'
import { userTrigger } from '../Redux/Slices/User'
import { fetchSchedule, scheduleTrigger } from './../Redux/Slices/Schedule'
import { fetchDepartments4List } from './../Redux/Slices/Department4List'
import { eventTrigger } from '../Redux/Slices/Event'
import { fetchEvent4List } from '../Redux/Slices/Event4List'

function WebSocketComponent() {
    const ws = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        connectWebsocket()
        return () => {
            if (ws.current) ws.current.close()
        }
    }, [])

    const connectWebsocket = () => {
        ws.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVER__URL)

        ws.current.onopen = () => {
            console.log('WebSocket connected')
        }

        ws.current.onmessage = event => {
            const message = JSON.parse(event.data)
            handleMessage(message)
        }

        ws.current.onclose = event => {
            console.log(`WebSocket disconnected with code ${event.code}`)
            // Reconnect after 5 seconds
            setTimeout(connectWebsocket, 3000)
        }
    }

    const handleMessage = message => {
        const { fullDocument, operationType, collection } = message

        switch (collection) {
            case 'patients':
                dispatch(patientTrigger())
                break
            case 'schedules':
                dispatch(patientTrigger())
                dispatch(scheduleTrigger())
                break
            case 'departments':
                dispatch(departmentTrigger())
                dispatch(fetchDepartments4List())
                break
            case 'reports':
                dispatch(scheduleTrigger())
                break
            case 'users':
                dispatch(userTrigger())
                break
            case 'events':
                dispatch(eventTrigger())
                dispatch(fetchEvent4List())
                break
        }
    }
}

export default WebSocketComponent
