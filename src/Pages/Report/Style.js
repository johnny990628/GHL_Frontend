import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',

        height: '100%',
        margin: '1rem',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        border: `1px solid ${theme.palette.border.main}`,
    },
}))

export default useStyles
