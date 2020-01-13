import * as actionTypes from './actionTypes';
import axios from 'axios';
import setAuthToken from '../../setAuthToken';
import jwt_decode from 'jwt-decode';

// export const signup = data => {
//     axios.post('/signup', data)
//         .then(result => {
//             console.log(result.data);
//         })
//         .catch(err => {
//             console.log('Pogresan mail ili password');
//         })
// }

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: authData
    };
};

export const logoutUser = history => dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded
    };
};

export const login = (email, password) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password
        };
        axios.post('/login', authData)
            .then(res => {
                const { token } = res.data;
                localStorage.setItem('token', token);
                setAuthToken(token);
                try {
                    const decoded = jwt_decode(token);
                    dispatch(setCurrentUser(decoded));
                } catch (err) {

                }
            })
    }
}