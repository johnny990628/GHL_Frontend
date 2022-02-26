import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(5),
        width: '100%',
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3.5rem',
        margin: theme.spacing(2),
    },
    table: {
        margin: theme.spacing(0.4),
        width: '100%',
    },
}));

export default useStyles;
