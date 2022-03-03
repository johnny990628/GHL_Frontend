import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        height: '100%',
        width: 'calc(100% - var(--sidebar-width))',
        left: 'var(--sidebar-width)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        padding: '2rem 8rem 2rem 4rem',
        backgroundColor: theme.palette.background.default,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
    },
}));

export default useStyles;
