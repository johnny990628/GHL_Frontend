import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    container: {
        // margin: theme.spacing(0.4),
        width: '100%',
        height: '96%',
        boxShadow: '6px 6px 10px rgba(0,0,0,0.2)',
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '1rem',
        padding: '1rem',
    },
    table: {
        backgroundColor: theme.palette.secondary.main,
        fontSize: '1.1rem ',
        padding: '1.3rem',
        borderRadius: '1rem',

        '& .MuiDataGrid-cell': { textOverflow: 'ellipsis' },
    },
}))

export default useStyles
