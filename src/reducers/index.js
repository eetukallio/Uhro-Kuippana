import { combineReducers } from 'redux';
import loginReducer from './loginform_reducer';
import hoursReducer from './hourform_reducer';

const rootReducer = combineReducers({
    auth: loginReducer,
    hours: hoursReducer
});

export default rootReducer;