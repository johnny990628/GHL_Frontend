import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        borderRadius: '0 2rem 2rem 0',
        width: 'var(--sidebar-open-width)',
        height: '100vh',
        transition: 'width .4s ease-in',
        '&.close': {
            width: 'var(--sidebar-close-width)',
        },
        boxShadow: '6px 6px 10px rgba(0,0,0,0.1)',
    },
    list: {
        height: '100%',
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    link: {
        textDecoration: 'none',
        margin: theme.spacing(1),
        borderRadius: '1rem',
        transition: 'transform .4s ease-out',
        '&.active': {
            backgroundColor: theme.palette.primary.light,
        },
        '&:hover': {
            transform: 'scale(1.03)',
        },
    },
    text: {
        color: '#000000',
        fontSize: '1.3rem',
        marginLeft: '1rem',
        whiteSpace: 'nowrap',
        '&.active': {
            color: theme.palette.primary.main,
        },
    },
    logo: {
        margin: '1rem',
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.primary.main,
    },
    openIcon: {
        padding: '3rem 1.5rem',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
        '&:hover': {
            cursor: 'pointer',
        },
    },
    closeIcon: {
        position: 'absolute',
        bottom: 10,
        left: '10rem',
        padding: '1.5rem',
        color: theme.palette.primary.main,
        '&:hover': {
            cursor: 'pointer',
        },
    },
}))

export default useStyles
