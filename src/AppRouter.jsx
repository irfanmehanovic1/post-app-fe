import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import StandardPage from './pages/StandardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostCreatePage from './pages/PostCreatePage';
import CommentCreatePage from './pages/CommentCreatePage';
import ReplyCreatePage from './pages/ReplyCreatePage';
import PostsPage from './pages/PostsPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/post-create">
          <PostCreatePage />
        </Route>
        <Route path="/posts" exact>
          <PostsPage />
        </Route>
        <Route path="/error">
          <ErrorPage />
        </Route>
        <Route path="/comment/:id">
          <ReplyCreatePage />
        </Route>
        <Route path="/posts/:id">
          <CommentCreatePage />
        </Route>
        <Route path="/">
          <StandardPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;

