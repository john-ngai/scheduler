import React from 'react';
import ReactDOM from 'react-dom';
import Application from 'components/Application';
import 'index.scss';
import store from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);
