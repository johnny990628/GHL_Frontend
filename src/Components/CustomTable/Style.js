import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        // margin: theme.spacing(0.4),

        width: '100%',
        height: '60vh',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
    },
    table: {
        backgroundColor: theme.palette.secondary.main,
        fontSize: '1.2rem ',
        padding: '1.5rem',
        borderRadius: '1rem',
    },
}));

export default useStyles;
