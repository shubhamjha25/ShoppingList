import axios from 'axios';
import { returnErrors } from './errorActions';

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types';

// Check Token & Load The User
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.msg));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

// Setup Config Headers & Token
export const tokenConfig = getState => {
    // Get Token From localStorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If Token, Add it to the Headers
    if(token) {
        config.headersp['x-auth-token'] = token;
    }

    return config;
}