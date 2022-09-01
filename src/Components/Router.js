import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import routerList from './Router.config'
import Authorized from './Authorized/Authorized'

const Router = () => {
    const location = useLocation()
    const { user } = useSelector(state => state.auth)
    useEffect(() => {}, [location.pathname])

    return (
        <Routes>
            {routerList.map(({ path, authority, Component }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Authorized authority={authority} currentRole={user.role} noMatch={<></>}>
                            <Component />
                        </Authorized>
                    }
                />
            ))}
        </Routes>
    )
}

export default Router
