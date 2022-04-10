import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    table: {
        border: '1px solid #000000',
        borderCollapse: 'collapse',
        padding: '.2rem',
    },
    title: {
        color: theme.palette.primary.main,
        fontSize: '1rem',
    },
}))

export default useStyles
