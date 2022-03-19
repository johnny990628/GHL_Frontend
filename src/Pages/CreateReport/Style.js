import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    stepLabel: {
        fontSize: '1.5rem',
    },
    container: {
        display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem',
        height: '80%',
    },
    tableContainer: {
        margin: '1rem',
        padding: '1rem',
        width: '90%',
        height: '100%',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        border: `1px solid ${theme.palette.border.main}`,
    },
    status: {
        backgroundColor: theme.palette.status.processing,
        padding: '8px',
        borderRadius: '1rem',
        width: '90%',
    },
    statusBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
    },
    button: {
        fontSize: '1rem',
    },
    patientInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: theme.palette.primary.light_secondary,
        color: theme.palette.primary.main,
        // borderRadius: '1rem',
        padding: '1rem',
    },
    chip: {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        fontSize: '1.3rem',
        padding: '.6rem',
    },
}))

export default useStyles
