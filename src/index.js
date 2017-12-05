import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app';
import AppReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadUserData, loadProductsList, loadStatuses, loadUsersList } from "./actions";
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    AppReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(loadUserData());
store.dispatch(loadStatuses());
store.dispatch(loadUsersList());
store.dispatch(loadProductsList());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
// registerServiceWorker();
