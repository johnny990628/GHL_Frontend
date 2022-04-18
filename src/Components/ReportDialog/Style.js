import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    table: {
        border: '1px solid #000000',
        borderCollapse: 'collapse',
        padding: '.15rem',
    },
    title: {
        color: theme.palette.primary.main,
        fontSize: '1rem',
    },
    actionButton: {
        fontSize: '1.3rem',
    },
}))

export default useStyles
