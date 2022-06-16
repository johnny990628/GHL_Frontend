import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Layout from './Components/Layout/Layout'
import Login from './Pages/Login/Login'
import { apiVerify } from './Axios/Auth'
import { fillAuthState } from './Redux/Slices/Auth'
import CustomAlert from './Components/CustomAlert/CustomAlert'

const App = () => {
    const dispatch = useDispatch()
    const { verify } = useSelector(state => state.auth)
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    useEffect(() => {
        if (isLoggedIn) apiVerify().then(res => dispatch(fillAuthState({ user: res.data.user, token: res.data.token })))
    }, [])

    return (
        <>
            {verify ? <Layout /> : <Login />}
            <CustomAlert />
        </>
    )
}

export default App
