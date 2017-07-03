import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppConnected from './containers/App';
import {Provider} from 'react-redux';
import './index.css';
import {store} from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
