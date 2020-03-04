import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import * as serviceWorker from './serviceWorker';
import './scss/index.scss';
import { App } from './App';
import { store } from './store';

library.add(far, fas, fab);

global.store = store;
global.env = runtimeEnv();

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root'),
  );

render(App);
serviceWorker.register();
