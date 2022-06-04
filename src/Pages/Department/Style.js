import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1rem',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        border: `1px solid ${theme.palette.border.main}`,
    },
    formWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formHeader: {
        fontSize: '3rem',
    },
}))

export default useStyles
