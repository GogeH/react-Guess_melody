import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ToastContainer } from 'react-toastify';

import { createAPI } from './services/api';
import { Router as BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import { requireAuthorization } from './store/action';
import { fetchQuestionAction, checkAuthAction } from './store/api-actions';
import { AuthorizationStatus } from './const';
import { redirect} from './store/middlewares/redirect';
import browserHistory from './browser-history';

import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchQuestionAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <BrowserRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
