import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        height: '100%',
        width: 'calc(100% - var(--sidebar-width))',
        left: 'var(--sidebar-width)',
    },
}));

export default useStyles;
