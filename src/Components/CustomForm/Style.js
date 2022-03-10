import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    formWrapper: {
        // backgroundColor: theme.palette.secondary.main,
        // borderRadius: '1rem 1rem 0 0',
        // padding: '1rem',
        // marginBottom: '1rem',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        // border: `1px solid ${theme.palette.border.main}`,
    },
    formHeader: {
        fontSize: '3rem',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField: {
        margin: '.5rem 2.8rem',
        width: '28rem',
        // [theme.breakpoints.down('xl')]: {
        //     width: '20rem',
        // },
        [theme.breakpoints.down('lg')]: {
            width: '80%',
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
        width: '25%',
        fontSize: '1.2rem',
        margin: '1rem',
    },
    qrcodeButton: {
        width: '25%',
        fontSize: '1.2rem',
        margin: '1rem',
        backgroundColor: theme.palette.contrast.main,
        '&:hover': {
            backgroundColor: theme.palette.contrast.dark,
        },
    },
}))

export default useStyles
