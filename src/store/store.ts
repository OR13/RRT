import {createStore, applyMiddleware, Store} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({});

function configureStore(): Store<any> {
  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );

  return store;
}

export const store = configureStore();
