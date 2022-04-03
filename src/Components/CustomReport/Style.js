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
        fontSize: '1.8rem',
        color: theme.palette.primary.main,
        whiteSpace: 'nowrap',
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
    toggleButton: {
        marginRight: '1rem',
        padding: '0 .8rem',
        margin: '.3rem',
        border: 'none',
        borderRadius: '1rem',
    },
    reportListItem: {
        padding: 0,
    },
}))

export default useStyles
