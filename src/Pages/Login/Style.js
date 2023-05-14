import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.primary.main,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.background.default,
        padding: '2rem',
        borderRadius: '1rem',
        width: '30rem',
    },
    icons: {
        color: theme.palette.secondary.main,
        fontSize: 100,
    },
    iconButton: {
        padding: 60,
    },
}))

export default useStyles
