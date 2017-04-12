import { CHANGE_HOURS_FORM, SENDING_FORM, SET_ERROR_MESSAGE } from '../constants/AppConstants';
import axios from 'axios';

export function submit(formData) {
    return function(dispatch) {
        dispatch(sendingRequest(true));

        axios.post("http://207.154.228.188:3000/workorders", JSON.stringify(formData), {headers: {'Content-Type': 'application/json'}})
            .then(res => {
                console.log(res);
                dispatch(sendingRequest(false));
            })
            .catch((err) => {
                dispatch(sendingRequest(false));
                console.log(err)
            });
    }
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newState) {
    return { type: CHANGE_HOURS_FORM, newState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
    return { type: SENDING_FORM, sending };
}

/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
    return (dispatch) => {
        dispatch({ type: SET_ERROR_MESSAGE, message });

        const form = document.querySelector('.form-page__form-wrapper');
        if (form) {
            form.classList.add('js-form__err-animation');
            // Remove the animation class after the animation is finished, so it
            // can play again on the next error
            setTimeout(() => {
                form.classList.remove('js-form__err-animation');
            }, 150);

            // Remove the error message after 3 seconds
            setTimeout(() => {
                dispatch({ type: SET_ERROR_MESSAGE, message: '' });
            }, 3000);
        }
    }
}
