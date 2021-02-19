import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';
import Navigation from './containers/Navigation';
import { ADMIN_ROUTES, USER_ROUTES } from './routes';
import { PrivateRoute } from './hooks/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {Object.keys(USER_ROUTES).map((route) => (
          <PrivateRoute
            key={USER_ROUTES[route].path}
            exact={USER_ROUTES[route].isExact}
            path={USER_ROUTES[route].path}
            component={USER_ROUTES[route].component}
            isAuthenticated={isAuthenticated}
            redirectTo={'/login'}
          />
        ))}
        {Object.keys(ADMIN_ROUTES).map((route) => (
          <PrivateRoute
            key={ADMIN_ROUTES[route].path}
            exact={ADMIN_ROUTES[route].isExact}
            path={ADMIN_ROUTES[route].path}
            component={ADMIN_ROUTES[route].component}
            isAuthenticated={isAdmin}
            redirectTo={'/'}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
