import { SET_AUTH, SET_USER, UNAUTH_USER, CHANGE_FORM, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';
import { browserHistory } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookie';

export function login(username, password) {
    return function(dispatch) {
        dispatch(sendingRequest(true));

        axios.post("api/auth/login", {username, password})
            .then((res) => {
                console.log("USER ID IS " + res.data.user.id);
                cookie.save('token', res.data.token, {path: '/'});
                cookie.save('user', res.data.user, {path: '/'});
                dispatch(sendingRequest(false));
                dispatch({type: SET_AUTH});
                dispatch(setUser(res.data.user.id));
                browserHistory.push("/home");
            })
            .catch((err) => {
                dispatch(sendingRequest(false));
                dispatch(setErrorMessage(err.response.statusText));
                console.log(err.response)
            });
    }
}

//logout
export function logout() {
    return function (dispatch) {
        dispatch({type: UNAUTH_USER});
        cookie.remove('token', {path: '/'});
        browserHistory.push("/login");
    }
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
    return { type: SET_AUTH, newState };
}

export function setUser(newState) {
    return { type: SET_USER, newState}
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newState) {
    return { type: CHANGE_FORM, newState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
    return { type: SENDING_REQUEST, sending };
}

/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
    return (dispatch) => {
        dispatch({ type: SET_ERROR_MESSAGE, message });
    }
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
    console.log('forwardTo(' + location + ')');
    browserHistory.push(location);
}