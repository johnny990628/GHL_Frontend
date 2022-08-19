import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        border: `1px solid ${theme.palette.border.main}`,

        // height: '100%',
    },
    accordion: {
        backgroundColor: theme.palette.secondary.main,
        width: '90%',
    },
    status: {
        backgroundColor: theme.palette.status.yet,
        padding: '8px',
        marginLeft: '.8rem',
        borderRadius: '1rem',
        width: '6rem',
        '&.processing': {
            backgroundColor: theme.palette.status.processing,
        },
        '&.finish': {
            backgroundColor: theme.palette.status.finish,
        },
    },
    statusBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
    },
    radioGroup: {
        position: 'absolute',
        left: 20,
        top: 30,
    },
}))

export default useStyles
