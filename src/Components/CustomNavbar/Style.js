import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.secondary.main,

        backdropFilter: 'blur(5px)',
        height: '4rem',

        // transition: 'padding .4s ease-in',
        '&.close': {
            // paddingLeft: 'var(--sidebar-close-width)',
        },
    },
    toolbar: {
        height: '100%',
    },
}))

export default useStyles
