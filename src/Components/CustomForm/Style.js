import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    formWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
    },
    formHeader: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        margin: '.8rem 0',
        width: '30rem',

        [theme.breakpoints.down('md')]: {
            width: '15rem',
        },
    },

    formBody: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    labelText: {
        fontSize: '1.5rem',
        color: theme.palette.primary.main,
    },
    button: {
        width: '20%',
        fontSize: '1.2rem',
        margin: '1rem',
    },
    qrcodeButton: {
        backgroundColor: theme.palette.contrast.main,
        '&:hover': {
            backgroundColor: theme.palette.contrast.dark,
        },
    },
    helperText: {
        fontSize: '1rem',
    },
}))

export default useStyles
