import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(5),
        width: '100%',
    },
    title: {
        fontSize: '4rem',
        margin: theme.spacing(2),
    },
    table: {
        margin: theme.spacing(2),
        height: '36rem',
        width: '90%',
    },
}));

export default useStyles;
