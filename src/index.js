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
import { homeReducer } from './reducers/index';
import { checkAuth } from './utils/checkAuth';
import cookie from 'react-cookie';
import {SET_AUTH} from './constants/AppConstants';
import Customers from './views/management/managementComponents/Customers';
import Workers from './views/management/managementComponents/Workers';
import HourEntries from './views/management/managementComponents/HourEntries';
import axios from 'axios';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(homeReducer);
const token = cookie.load('token');

if (token) {
    store.dispatch({type: SET_AUTH});
    axios.defaults.headers.common['Authorization'] = token;
}

axios.defaults.baseURL = 'http://207.154.228.188:3000';

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={checkAuth(HourEntry)}/>
                <Route path="/paychecks" component={checkAuth(Paychecks)}/>
                <Route path="/management" component={checkAuth(Management)}>
                    <IndexRoute component={HourEntries}/>
                    <Route path="/management/workers" component={Workers}/>
                    <Route path="/management/customers" component={Customers}  token={token}/>
                    <Route path="/management/entries"  component={HourEntries}  token={token}/>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
