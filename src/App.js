import React from 'react'

import Layout from './Components/Layout/Layout'

import CustomAlert from './Components/CustomAlert/CustomAlert'
import useWebsocket from './Hooks/useWebsocket'

const App = () => {
    useWebsocket()

    return (
        <>
            <Layout />
            <CustomAlert />
        </>
    )
}

export default App
