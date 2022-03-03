import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.secondary.main,
        height: '100%',
        borderRadius: '2rem',
        marginRight: theme.spacing(2),
        padding: theme.spacing(2),
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
    },
    container: {
        width: 'var(--sidedrawer-width)',
        borderRadius: '1rem 0 0 1rem',
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        padding: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
    },
    cardWrapper: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    cardContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    cardIcon: {
        marginRight: theme.spacing(2),
        width: 140,
        height: 140,
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardTopic: {
        fontSize: '1.8rem',
    },
}));

export default useStyles;
