import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    qrcodeButton: {
        width: '100%',
        fontSize: '1.2rem',
        margin: '1rem',
        backgroundColor: theme.palette.contrast.main,
        '&:hover': {
            backgroundColor: theme.palette.contrast.dark,
        },
    },
}))

export default useStyles
