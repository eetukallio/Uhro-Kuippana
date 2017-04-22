import { combineReducers } from 'redux';
import loginReducer from './loginform_reducer';
import hoursReducer from './hourform_reducer';
import addWorkerReducer from './addworker_reducer';

const rootReducer = combineReducers({
    auth: loginReducer,
    hours: hoursReducer,
    register: addWorkerReducer
});

export default rootReducer;