import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    box: {
        backgroundColor: theme.palette.secondary.main,
        height: '100%',
        borderRadius: '2rem',
        // marginRight: theme.spacing(2),
        padding: theme.spacing(2),
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        border: `1px solid ${theme.palette.border.main}`,
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
    },
    cardHeader: {
        // marginRight: theme.spacing(2),
        padding: theme.spacing(2),
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
}))

export default useStyles
