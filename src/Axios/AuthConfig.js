import axios from 'axios'
export default axios.create({
    baseURL: process.env.REACT_APP_AUTH_URL,
    headers: {
        'Content-type': 'application/json',
    },
    withCredentials: true,
})
