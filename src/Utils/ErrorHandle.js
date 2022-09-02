import { openAlert } from '../Redux/Slices/Alert'
import { logout } from '../Redux/Slices/Auth'

export const tokenExpirationHandler = error =>
    error.status === 403
        ? logout(true)
        : openAlert({
              toastTitle: error.statusText,
              text: error.data.message,
              icon: 'error',
          })
