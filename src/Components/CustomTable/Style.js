import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        // margin: theme.spacing(0.4),
        width: '100%',
        height: '100%',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        padding: '1rem',
    },
    tableHeader: {
        fontSize: '1.1rem',
        backgroundColor: theme.palette.secondary.main,
        borderBottom: `1px solid ${theme.palette.primary.light}`,
    },
    tableHeaderTotal: {
        marginRight: '2rem',
        fontSize: '1.1rem',
    },
    tableFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    tableFooterItem: {
        marginRight: '1rem',
    },
    scrollbar: {
        backgroundColor: theme.palette.primary.light,
    },
}))

export default useStyles
