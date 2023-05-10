import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.primary.main,
        // opacity: 0.5,
        // backgroundColor: 'transparent',
        backdropFilter: 'blur(2px)',
        height: '3rem',
        paddingLeft: 'var(--sidebar-open-width)',

        transition: 'padding .4s ease-in',
        '&.close': {
            paddingLeft: 'var(--sidebar-close-width)',
        },
    },
    toolbar: {
        height: '100%',
        paddingBottom: '1.3rem',
    },
}))

export default useStyles
