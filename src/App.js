import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainPage from './containers/MainPage/MainPage';

import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import store from './store';
import { setCurrentUser } from './store/actions/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './containers/Navigation/Navigation';

const lsTest = () => {
  const test = 'test';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
  } catch(e) {
      return false;
  }
}

if(lsTest() === true){
   if (localStorage.token !== undefined && localStorage.token !== '' && localStorage.token !== 'undefined') {
    setAuthToken(localStorage.token);
    const decoded = jwt_decode(localStorage.token);
    store.dispatch(setCurrentUser(decoded));
  
    // const currentTime = Date.now() / 1000;
    // if (decoded.exp < currentTime) {
    //   store.dispatch(logoutUser());
    //   window.location.href = '/login'
    // }
  } else {
    store.dispatch(setCurrentUser({}));
  }
} else {
  store.dispatch(setCurrentUser({}));
}


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <MainPage />
      </BrowserRouter>
    );
  }
}

export default App;
