import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        margin: '.5rem 0',
        height: '100%',
    },
    table: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        padding: '1rem',
        marginBottom: '1rem',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
    },
    tableHeader: {
        fontSize: '2.3rem',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        margin: '.5rem 2rem',
        width: '70%',
        [theme.breakpoints.down('xl')]: {
            width: '20rem',
        },
        [theme.breakpoints.down('lg')]: {
            width: '16rem',
        },
    },
    tableBody: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',

        [theme.breakpoints.down('xl')]: {
            justifyContent: 'center',
        },
    },
    labelText: {
        fontSize: '1.5rem',
        color: theme.palette.primary.main,
    },
    button: {
        width: '30%',
        fontSize: '1.2rem',
        margin: '1rem',
    },
}))

export default useStyles
