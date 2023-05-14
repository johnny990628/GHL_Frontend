import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        width: 'calc(100% - var(--sidebar-open-width))',
        left: 'var(--sidebar-open-width)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        padding: '5rem 2rem 2rem 2rem',
        // backgroundColor: theme.palette.background.main,
        borderRadius: '1rem',
        transition: 'all .4s ease-in',
        '&.close': {
            width: 'calc(100% - var(--sidebar-close-width))',
            left: 'var(--sidebar-close-width)',
        },
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        fontSize: '2rem',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    dashboardButton: {
        position: 'fixed !important',
        top: '50%',
        right: -30,
        borderRadius: '50%',
        backgroundColor: `${theme.palette.secondary.main} !important`,
        '&.hover': {
            backgroundColor: theme.palette.background.default,
        },
        // '&::before': {
        //     content: '""',
        //     display: 'block',
        //     width: 60,
        //     height: 60,
        //     position: 'absolute',
        //     right: 0,
        //     top: -50,
        //     zIndex: -1,
        //     backgroundColor: theme.palette.background.default,
        //     borderRadius: '50%',
        // },
        // '&::after': {
        //     content: '""',
        //     display: 'block',
        //     width: 60,
        //     height: 60,
        //     position: 'absolute',
        //     right: 0,
        //     top: 60,
        //     zIndex: -1,
        //     // backgroundColor: theme.palette.primary.light,
        //     backgroundColor: theme.palette.background.default,
        //     borderRadius: '50%',
        // },
    },
}))

export default useStyles
