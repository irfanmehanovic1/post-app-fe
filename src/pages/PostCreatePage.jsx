import * as React from 'react';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosFetch, { requestMethods } from '../axios/axios';
import { useHistory } from 'react-router-dom';


const theme = createTheme();

const PostPage = () => {
  let history = useHistory();
const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    await axiosFetch({
      data,
      method: requestMethods.POST,
      url: process.env.REACT_APP_URL + '/post/create'
    });
    history.push('/posts');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create new post
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    {...register('title', {
                        required: true,
                    })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    type="description"
                    id="description"
                    autoComplete="description"
                    {...register('description', {
                        required: true,
                    })}
                    />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Create
                </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default PostPage;