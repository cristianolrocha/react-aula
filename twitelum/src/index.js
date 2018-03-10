import React from 'react';
import ReactDOM from 'react-dom';

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'

import './assets/css/novoTweet.css'
// import './index.css';

import { BrowserRouter, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'

import App from './App';
import PerfilPage from './pages/PerfilPage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter >
    <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/:login" exact component={PerfilPage}/>
    </Switch>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
