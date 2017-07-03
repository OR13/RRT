import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import AppConnected from './containers/App';
import {Provider} from 'react-redux';
import './index.css';
import {store, history} from './store/store';

import { ConnectedRouter,  } from 'react-router-redux';
import { Route } from 'react-router';

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

// let App:any = AppConnected;
import StarWarsPage from './components/StarWarsPage';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={StarWarsPage}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);