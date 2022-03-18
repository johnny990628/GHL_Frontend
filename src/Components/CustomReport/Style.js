import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: { display: 'flex', alignItems: 'center', height: '100%' },
    scrollspy: { marginRight: '2rem' },
    scrollspyButton: {
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    formContainer: {
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
    },
    formLabel: {
        fontSize: '2rem',
        marginRight: '1rem',
    },
    linkLabel: {
        fontSize: '1.3rem',
        whiteSpace: 'nowrap',
    },
    inputLabel: {
        fontSize: '1.3rem',
        padding: '.3rem',
    },
}))

export default useStyles
