import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        width: 'var(--sidedrawer-width)',
        borderRadius: '1rem 0 0 1rem',
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: '1.5rem',
        color: theme.palette.primary.main,
    },
    tableContainer: {
        overflowX: 'hidden !important',
    },
    tableRow: {
        '&:last-child td, &:last-child th': { border: 0 },
        transition: 'transform .3s ease-out',
        '&:hover': { cursor: 'pointer', background: theme.palette.status.processing, transform: 'scale(1.013)' },
    },
    tableCell: { fontSize: '1rem' },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
}))

export default useStyles
