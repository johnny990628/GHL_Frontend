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
        color: theme.palette.primary.main,
    },
}));

export default useStyles;
