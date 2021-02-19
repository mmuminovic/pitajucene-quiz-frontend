import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';
import logo from '../assets/images/logo-white.png';
import { authSlice } from '../store/authSlice';
import jwtDecode from 'jwt-decode';
import { Menu } from '@material-ui/icons';

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const lsTest = () => {
      const test = 'test';
      try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    };

    if (lsTest() === true) {
      if (
        localStorage.auth_token !== undefined &&
        localStorage.auth_token !== '' &&
        localStorage.auth_token !== 'undefined'
      ) {
        const decoded = jwtDecode(localStorage.auth_token);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          dispatch(authSlice.actions.auth());
          history.replace('/login');
        } else {
          dispatch(
            authSlice.actions.auth({
              token: localStorage.auth_token,
            }),
          );
        }
      } else {
        dispatch(authSlice.actions.auth());
        history.replace('/login');
      }
    } else {
      dispatch(authSlice.actions.auth());
      history.replace('/login');
    }
  }, [history, dispatch]);

  return (
    <>
      {authState.token && (
        <div className="navigation">
          <Navbar expand="xs">
            <NavbarText onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
              <img src={logo} alt="logo" width="32px" />
            </NavbarText>

            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  nav
                  style={{
                    color: '#fff',
                    fontSize: '1.4rem',
                  }}
                >
                  <Menu
                    htmlColor="#fff"
                    style={{
                      width: '24px',
                      height: '24px',
                    }}
                  />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    style={{ fontSize: '1.4rem' }}
                    onClick={() => {
                      history.push('/');
                    }}
                  >
                    Početna
                  </DropdownItem>
                  <DropdownItem
                    style={{ fontSize: '1.4rem' }}
                    onClick={() => {
                      history.push('/profile');
                    }}
                  >
                    Moj profil
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    style={{ fontSize: '1.4rem' }}
                    onClick={() => {
                      dispatch(authSlice.actions.auth());
                      history.replace('/login');
                    }}
                  >
                    Odjavi se
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Navbar>
        </div>
      )}
    </>
  );
};

export default Navigation;
