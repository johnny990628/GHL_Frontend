import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: { display: 'flex', alignItems: 'center', height: '90%', width: '100%' },
    scrollspy: { marginRight: '1rem', padding: '.3rem' },
    scrollspyButton: {
        fontSize: '1.5rem',
        marginBottom: '1rem',
        color: theme.palette.primary.light_secondary,
        // '&:hover': {
        //     backgroundColor: theme.palette.primary.light,
        // },
        [theme.breakpoints.down('lg')]: {
            fontSize: '1.3rem',
        },
    },

    formContainer: {
        padding: '.5rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
    },
    formLabel: {
        fontSize: '2rem',
        color: theme.palette.primary.main,
        marginRight: '1rem',
        [theme.breakpoints.down('lg')]: {
            fontSize: '1.5rem',
        },
    },
    inputLabel: {
        fontSize: '1.3rem',
        padding: '.3rem',
        [theme.breakpoints.down('lg')]: {
            fontSize: '1rem',
        },
    },
}))

export default useStyles
