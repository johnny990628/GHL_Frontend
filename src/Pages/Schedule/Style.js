import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(5),
        width: '100%',
    },
    title: {
        fontSize: '3rem',
        margin: theme.spacing(1),
    },
    table: {
        margin: theme.spacing(1),
        width: '96%',
    },
}));

export default useStyles;
