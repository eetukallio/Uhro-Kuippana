import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './views/login/Login'
import Paychecks from './views/paychecks/Paychecks';
import HourEntry from './views/hourentry/HourEntry';
import Management from './views/management/Management';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';
import { checkAuth } from './utils/checkAuth';
import { checkEmployer } from './utils/checkEmployer';
import cookie from 'react-cookie';
import {SET_AUTH, SET_USER} from './constants/AppConstants';
import Customers from './views/management/managementComponents/Customers';
import Workers from './views/management/managementComponents/Workers';
import HourEntries from './views/management/managementComponents/HourEntries';
import AddWorkers from './views/management/managementComponents/AddWorkers'
import axios from 'axios';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore , +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStoreWithMiddleware(rootReducer);

const token = cookie.load('token');

if (token) {
    store.dispatch({type: SET_AUTH});
    axios.defaults.headers.common['Authorization'] = token;
}


axios.defaults.baseURL = 'http://207.154.228.188:3000';
// axios.defaults.baseURL = 'http://localhost:8080';



ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={checkAuth(HourEntry)}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={checkAuth(HourEntry)}/>
                <Route path="/paychecks" component={checkAuth(Paychecks)}/>
                <Route path="/management" component={checkEmployer(Management)}>
                    <IndexRoute component={Workers}/>
                    <Route path="/management/workers" component={Workers}/>
                    <Route path="/management/customers" component={Customers} />
                    <Route path="/management/entries"  component={HourEntries} />
                    <Route path="/management/addworkers"  component={AddWorkers} />
                </Route>
            </Route>
        </Router>
    </Provider>,
  document.getElementById('root')
);
