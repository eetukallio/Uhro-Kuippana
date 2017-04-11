import { CHANGE_FORM, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';

const assign = Object.assign;

// The initial application state
const initialState = {
    content: '',
    currentlySending: false,
    errorMessage: ''
};

// Takes care of changing the application state
export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_FORM:
            return {...state, content: action.content};
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
