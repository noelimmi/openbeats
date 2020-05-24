import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { history, store, ConnectedRouter } from "./store";
import { toastConfig } from "./config/toast";
import * as serviceWorker from './serviceWorker';

toastConfig();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// registering service worker
serviceWorker.register();