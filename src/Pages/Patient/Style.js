import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
    },
    table: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        padding: '2rem',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHeader: {
        fontSize: '2rem',
    },
    textField: {
        margin: '.5rem',
    },
}));

export default useStyles;
