import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(0.4),
        width: '94%',
        height: '80vh',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
    },
    table: {
        backgroundColor: theme.palette.secondary.main,
        fontSize: '1.2rem ',
        padding: '1rem',
        borderRadius: '1rem',
    },
}));

export default useStyles;
