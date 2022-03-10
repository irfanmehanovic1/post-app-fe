import * as React from 'react';
import { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axiosFetch, { requestMethods } from '../axios/axios';
import TablePagination from '@mui/material/TablePagination';
import { Button, Divider } from '@mui/material';
import { useHistory } from "react-router-dom";

const theme = createTheme();

const renderComments = (comments, username, history) => {
    return comments.map(comment => (
        <CardContent sx={{ flex: 1 }} key={comment._id}>
          <Divider />
          <Typography variant="p">
              Text: {comment.text}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
              Date:
              {new Date(Date.parse(comment.date)).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
          </Typography>
          <Typography variant="subtitle1" paragraph>
              Author: {comment.authorName || comment.author}
          </Typography>
          <Typography variant="subtitle1" color="primary">
          </Typography>
          {username && <Button onClick={() => history.push(`/comment/${comment._id}`)}>Reply</Button>}
          {!username && <Button onClick={() => history.push('/login')}>Login to reply</Button>}
          <Divider />
          {comment?.comments?.length > 0 && renderComments(comment.comments, username, history)}
      </CardContent>
    ))
}

const PostsPage = () => {
    let history = useHistory();
    const [username, setUsername] = useState(null);

    const [numberOfItems, setNumberOfItems] = useState(1);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
      };

    useEffect(() => {
        const getPosts = async () => {
            const response = await axiosFetch({
              data: null,
              method: requestMethods.GET,
              url: process.env.REACT_APP_URL + `/post?perPage=${rowsPerPage}&page=${currentPage+1}`
            });
            if(response.posts){
                setPosts(response.posts);
                setCurrentPage(response.currentPage-1);
                setNumberOfItems(response.numberOfItems);
            }
        };
        getPosts();
    }, [rowsPerPage, currentPage]);

    useEffect(() => {
        const getMe = async() => {
            const response = await axiosFetch({
                data: null,
                method: requestMethods.GET,
                url: process.env.REACT_APP_URL + `/user/getMe`
            });
            setUsername(response.username);
        };
        getMe();
    }, []);

  return (
    <ThemeProvider theme={theme}>
        {username && <div>Welcome {username}</div>}
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
            All posts
          </Typography>
          {posts && posts.map(post => {
              return <Grid item xs={12} md={6} key={post._id}>
              <CardContent>
                  <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                      <Typography component="h2" variant="h5">
                      Title: {post.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                      Date: {new Date(Date.parse(post.date)).toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                      Description: {post.description}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                          {renderComments(post.comments, username, history)}
                      </Typography>
                      {username && <Button onClick={() => history.push(`/posts/${post._id}`)}>Comment</Button>}
                      {!username && <Button onClick={() => history.push('/login')}>Login to Comment</Button>}
                  </CardContent>
                  </Card>
              </CardContent>
              <br />
            </Grid>
          })}
        </Box>
        {username && <Button  onClick={() => history.push('/post-create')}>Create a POST</Button>}
        {!username && <Button onClick={() => history.push('/login')}>Login to Create a POST</Button>}
      </Container>
      {posts && 
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={numberOfItems}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={(handleChangePage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />}
    </ThemeProvider>
  );
}

export default PostsPage;