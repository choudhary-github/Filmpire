import { makeStyles } from '@mui/styles';
// import { makestyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '8px',
  },
  links: {
    alignItems: 'center',
    textDecoration: 'none',
    fontWeight: 'bolder',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    borderRadius: '20px',
    height: '250px',
    marginBottom: '8px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '180px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '10px',
    marginBottom: 0,
    textAlign: 'center',
  },

}));
