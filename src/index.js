import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import  { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));
unregister();
