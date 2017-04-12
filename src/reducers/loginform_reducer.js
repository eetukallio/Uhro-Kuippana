import { CHANGE_FORM, SET_AUTH, UNAUTH_USER, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';

const assign = Object.assign;

// The initial application state
const initialState = {
    formState: {
        username: '',
        password: ''
    },
    loggedIn: false,
    currentlySending: false,
    errorMessage: ''
};

// Takes care of changing the application state
export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_FORM:
            return {...state, formState: action.newState};
        case SET_AUTH:
            return {...state, errorMessage: '', formState: {username: '', password: ''}, loggedIn: true};
        case UNAUTH_USER:
            return {...state, loggedIn: false};
        case SENDING_REQUEST:
            return {...state, currentlySending: action.sending };
        case SET_ERROR_MESSAGE:
            return assign({}, state, {
                errorMessage: action.message
            });
        default:
            return state;
    }
}
