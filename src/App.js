import React, { useEffect } from 'react'

import Layout from './Components/Layout/Layout'

import CustomAlert from './Components/CustomAlert/CustomAlert'
import useWebsocket from './Hooks/useWebsocket'
import { useDispatch } from 'react-redux'
import { fetchDepartments4List } from './Redux/Slices/Department4List'

const App = () => {
    useWebsocket()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDepartments4List())
    }, [])

    return (
        <>
            <Layout />
            <CustomAlert />
        </>
    )
}

export default App
