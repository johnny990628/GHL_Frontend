import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        margin: '.5rem 0',
    },
    table: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        padding: '1rem',
        marginBottom: '1rem',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHeader: {
        fontSize: '2rem',
        paddingBottom: '.5rem',
    },
    textField: {
        margin: '.5rem',
    },
}));

export default useStyles;
