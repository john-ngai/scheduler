import React from 'react';
import ReactDOM from 'react-dom';
import Application from 'components/Application';
import { Provider } from 'react-redux';
import store from './app/store';
import 'index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
);
