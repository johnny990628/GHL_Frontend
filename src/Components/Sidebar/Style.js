import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 'var(--sidebar-width)',
        borderRadius: '0 2rem 2rem 0 ',
    },
    list: {
        height: '100%',
        backgroundColor: '#F5D7DE',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    link: {
        textDecoration: 'none',
        margin: theme.spacing(1),
    },
    text: {
        color: '#000000',
        fontSize: '1.3rem',
        marginLeft: '1rem',
        '&.active': {
            color: theme.palette.primary.main,
        },
    },
    logo: {
        margin: '1rem',
    },
}));

export default useStyles;
