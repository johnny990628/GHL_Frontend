import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        // borderRadius: '0 .5rem .5rem 0',
        width: 'var(--sidebar-open-width)',
        marginTop: '5vh',
        height: '96vh',
        backgroundColor: theme.palette.secondary.main,
        transition: 'width .4s ease-in',
        borderRight: `1px solid ${theme.palette.gray.main}`,
        zIndex: 1,
        '&.close': {
            width: 'var(--sidebar-close-width)',
        },
        // boxShadow: '6px 6px 10px rgba(0,0,0,0.1)',
    },
    list: {
        height: '100%',

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
        color: theme.palette.text.primary,
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
        position: 'absolute',
        bottom: 30,
        left: '1.5rem',

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
