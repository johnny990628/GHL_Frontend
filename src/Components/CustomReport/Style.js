import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: { display: 'flex', alignItems: 'center', height: '90%', width: '100%' },
    scrollspy: { marginRight: '2rem', padding: '.3rem' },
    scrollspyButton: {
        fontSize: '1.6rem',
        marginBottom: '1rem',
        color: theme.palette.primary.light_secondary,
        // '&:hover': {
        //     backgroundColor: theme.palette.primary.light,
        // },
    },

    formContainer: {
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
    },
    formLabel: {
        fontSize: '2rem',
        color: theme.palette.primary.main,
        marginRight: '1rem',
    },
    inputLabel: {
        fontSize: '1.3rem',
        padding: '.3rem',
    },
}))

export default useStyles
