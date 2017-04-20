import { CHANGE_HOURS_FORM, SENDING_FORM, SET_ERROR_MESSAGE, OTHER_CLIENT, OTHER_QUALITY, HOURS_SENT } from '../constants/AppConstants';
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
    isOtherClient: false,
    isOtherQuality: false,
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
        case HOURS_SENT:
            return {...state, formState: {date: '', duration: '', distance: '', client: 'valitse', quality: '', additionalInfo: ''},
            isOtherClient: false, isOtherQuality: false};
        case OTHER_CLIENT:
            return {...state, isOtherClient: action.newState};
        case OTHER_QUALITY:
            return {...state, isOtherQuality: action.newState};
        case SET_ERROR_MESSAGE:
            return assign({}, state, {
                errorMessage: action.message
            });
        default:
            return state;
    }
}
