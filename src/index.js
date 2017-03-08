import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Login from './views/login/Login'
import Paychecks from './views/paychecks/Paychecks';
import HourEntry from './views/hourentry/HourEntry';
import Management from './views/management/Management';

import { browserHistory, Router, Route, IndexRoute} from 'react-router';

ReactDOM.render(
    <Router history={browserHistory}>

        <Route path="/" component={App}>

            <IndexRoute component={HourEntry}/>
            <Route path="/login" component={Login}/>
            <Route path="/home" component={HourEntry}/>
            <Route path="/paychecks" component={Paychecks}/>
            <Route path="/management" component={Management}/>
        </Route>
    </Router>,
  document.getElementById('root')
);
