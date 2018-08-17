import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Main from './components/Main'

ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/login" component={Login} />
        <Route path="/" name="Main" component={Main} />
      </Switch>
    </BrowserRouter>
  ,
  document.getElementById('app'));
registerServiceWorker();
