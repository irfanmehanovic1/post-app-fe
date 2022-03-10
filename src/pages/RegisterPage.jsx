import * as React from 'react';
import { useForm } from 'react-hook-form';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosFetch, { requestMethods } from '../axios/axios';
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react';

const theme = createTheme();

const RegisterPage = () => {
  let history = useHistory();
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    await axiosFetch({
      data,
      method: requestMethods.POST,
      url: process.env.REACT_APP_URL + '/user/create'
    });
    history.push('/login');
  };

  useEffect(() => {
    const getMe = async() => {
        const response = await axiosFetch({
            data: null,
            method: requestMethods.GET,
            url: process.env.REACT_APP_URL + `/user/getMe`
        });
        if(response.username){
          history.push('/posts');
        } 
    };
    if(localStorage.getItem('POST-APP-FE-TOKEN')){
      getMe();
    }
}, []);

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    {...register('username', {
                      required: true,
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register('password', {
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
  
export default RegisterPage;