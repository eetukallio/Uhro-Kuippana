import { CHANGE_ADDWORKER_FORM, ADDWORKER_SENT, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';

const assign = Object.assign;

// The initial application state
const initialState = {
    formState: {
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        zipCode: '',
        birthday: '',
        password: '',
        taxPercent: '',
        hourWage: '',
        username: '',
        isEmployer: false
    },
    currentlySending: false,
    errorMessage: ''
};

// Takes care of changing the application state
export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_ADDWORKER_FORM:
            return {...state, formState: action.newState};
        case ADDWORKER_SENT:
            return {...state, formState: {
                firstName: '',
                lastName: '',
                streetAddress: '',
                city: '',
                zipCode: '',
                birthday: '',
                password: '',
                taxPercent: '',
                hourWage: '',
                username: '',
                isEmployer: false
            }};
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
