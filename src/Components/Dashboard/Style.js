import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        width: 'var(--sidedrawer-width)',
        borderRadius: '1rem 0 0 1rem',
        backgroundColor: `${theme.palette.secondary.main} !important`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '1rem',
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
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
    },
    cardTopic: {
        fontSize: '1.3rem',
    },
}))

export default useStyles
