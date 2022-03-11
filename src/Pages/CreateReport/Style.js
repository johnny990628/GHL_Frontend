import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    stepLabel: {
        fontSize: '1.5rem',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '82%',
        margin: '1rem',
        padding: '1rem',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        border: `1px solid ${theme.palette.border.main}`,
    },
    status: {
        backgroundColor: theme.palette.status.processing,
        padding: '8px',
        borderRadius: '1rem',
    },
    statusBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
    },
}))

export default useStyles
