import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.background.default,

        borderBottom: `1px solid ${theme.palette.gray.main}`,
        // opacity: 0.5,
        // backgroundColor: 'transparent',
        backdropFilter: 'blur(5px)',
        height: '4rem',
        // paddingLeft: 'var(--sidebar-open-width)',

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
