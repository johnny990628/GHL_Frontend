import Request from './AuthConfig'
export const apiVerify = () => Request.post('/verify')
export const apiLogin = data => Request.post('/login', data)
export const apiLogout = () => Request.post('/logout')
export const apiRegister = data => Request.post('/register', data)
