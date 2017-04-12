import { CHANGE_HOURS_FORM, SENDING_FORM, SET_ERROR_MESSAGE } from '../constants/AppConstants';
import cookie from 'react-cookie';

const assign = Object.assign;

const currentUserInfo = cookie.load('user');
console.log(currentUserInfo);

// The initial application state
const initialState = {
    formState: {
        user: currentUserInfo.id,
        date: '',
        duration: '',
        distance: '',
        client: '',
        quality: '',
        additionalInfo: '',
    },
    currentlySending: false,
    errorMessage: ''
};

// Takes care of changing the application state
export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_HOURS_FORM:
            return {...state, formState: action.newState};
        case SENDING_FORM:
            return {...state, currentlySending: action.sending };
        case SET_ERROR_MESSAGE:
            return assign({}, state, {
                errorMessage: action.message
            });
        default:
            return state;
    }
}
