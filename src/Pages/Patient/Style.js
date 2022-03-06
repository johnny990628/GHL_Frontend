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
    },
    tableHeader: {
        fontSize: '2.5rem',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        margin: '.5rem 2rem',
        width: '80%',
        [theme.breakpoints.down('xl')]: {
            width: '20rem',
        },
        [theme.breakpoints.down('lg')]: {
            width: '16rem',
        },
    },
    tableBody: { display: 'flex', justifyContent: 'center', flexWrap: 'wrap' },
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
