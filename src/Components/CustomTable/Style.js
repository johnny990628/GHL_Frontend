import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        width: '100%',
        height: '100%',
        padding: '1rem',
    },
    tableHeader: {
        fontSize: '1.1rem',
        backgroundColor: theme.palette.secondary.main,
        borderBottom: `1px solid ${theme.palette.primary.light}`,
        [theme.breakpoints.down('lg')]: {
            fontSize: '1rem',
        },
    },
    tableHeaderTotal: {
        marginRight: '2rem',
        fontSize: '1.1rem',
    },
    tableFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingInline: '1rem',
        height: '10%',
    },
    tableFooterItem: {
        marginRight: '1rem',
    },
    scrollbar: {
        backgroundColor: theme.palette.primary.light,
    },
    clearButton: {
        backgroundColor: theme.palette.contrast.main,
    },
}))

export default useStyles
