import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Grid, Typography, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB';
import useStyles from './styles';
import { MovieList, Pagination } from '..';

function Actors() {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetching, error } = useGetActorQuery(id);
  const classes = useStyles();
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="5rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" color="primary">
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img className={classes.image} src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`} alt={data.name} />
        </Grid>
        <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant="h3" marginTop="2.5rem">
            {data.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box className={classes.button}>
            <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data.imdb_id}`}>IMDB</Button>
            <Button startIcon={<ArrowBack />} color="primary">Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h4" gutterBottom align="center">Movies</Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination setPage={setPage} currentPage={page} toatalPages={movies?.total_pages} />
      </Box>
    </>
  );
}

export default Actors;
