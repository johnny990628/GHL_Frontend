import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 'var(--sidebar-width)',
    },
    list: {
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        borderRight: '1px solid #C8DCC3',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    link: {
        textDecoration: 'none',
        margin: '.5rem',
    },
    item: {
        color: '#000000',
        '&.active': {
            color: theme.palette.primary.main,
        },
    },
}));

export default useStyles;
