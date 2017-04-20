import { CHANGE_HOURS_FORM, SENDING_FORM, SET_ERROR_MESSAGE, HOURS_SENT, OTHER_CLIENT, OTHER_QUALITY } from '../constants/AppConstants';
import axios from 'axios';

export function submit(formData) {
    return function(dispatch) {
        dispatch(sendingRequest(true));

        axios.post("/workorders", JSON.stringify(formData), {headers: {'Content-Type': 'application/json'}})
            .then(res => {
                console.log("SENT " + res);
                dispatch(hourSent());
                dispatch(sendingRequest(false));
            })
            .catch((err) => {
                dispatch(sendingRequest(false));
                console.log(err);
            });
    }
}

export function addQuality(addQuality, formData) {
    const sendData = {"name": addQuality};
    console.log(sendData);

    return function (dispatch) {
        axios.post("/qualities", sendData, {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                console.log("In addQuality function" + res.data.insertId);
                return res.data.insertId;
            })
            .then((res) => {
                const newForm = Object.assign(formData, {quality: res});
                console.log(newForm);
                dispatch(submit(newForm))})
            .catch(err => console.log(err));
    }
}

export function addClient(addClient, formData) {
    const sendData = {"name": addClient};
    console.log(sendData);

    return function (dispatch) {
        axios.post("/clients", sendData, {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                console.log("In addClient function" + res.data.insertId);
                return res.data.insertId;
            })
            .then((res) => {
                const newForm = Object.assign(formData, {client: res});
                console.log(newForm);
                dispatch(submit(newForm))})
            .catch(err => console.log(err));
    }
}

export function addBoth(addClient, addQuality, formData) {
    const sendClientData = {"name": addClient};
    const sendQualityData = {"name": addQuality};
    let clientInsertId, qualityInsertId;

    return function (dispatch) {
        axios.post("/clients", sendClientData, {headers: {'Content-Type': 'application/json'}})
            .then((res) => {
                clientInsertId = res.data.insertId;
            })
            .then((res) => {
                axios.post("/qualities", sendQualityData, {headers: {'Content-Type': 'application/json'}})
                    .then((res) => {
                        console.log(res.data.insertId);
                        qualityInsertId = res.data.insertId;
                    })
                    .then((res) => {
                        console.log(qualityInsertId + " " + clientInsertId);
                        const add = Object.assign(formData, {client: clientInsertId, quality: qualityInsertId});
                        console.log(add);
                        dispatch(submit(add));
                    }).catch(err => console.log(err))
            })
            .catch(err => console.log(err));
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

export function otherClient(newState) {
    return { type: OTHER_CLIENT, newState}
}

export function otherQuality(newState) {
    return { type: OTHER_QUALITY, newState}
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
    return { type: SENDING_FORM, sending };
}

export function hourSent() {
    return { type: HOURS_SENT };
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
