import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    table: {
        fontSize: '1rem',
    },
}));

export default useStyles;
