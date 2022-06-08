import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'
import Layout from './Components/Layout/Layout'
import Login from './Pages/Login/Login'

const App = () => {
    const { user, verify, token } = useSelector(state => state.auth)
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    return <>{verify || isLoggedIn ? <Layout /> : <Login />}</>
}

export default App
