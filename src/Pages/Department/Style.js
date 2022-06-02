import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.secondary.main,
        height: '100%',
        borderRadius: '2rem',
        padding: theme.spacing(2),
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        border: `1px solid ${theme.palette.border.main}`,
    },
}))

export default useStyles
