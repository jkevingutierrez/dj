import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import map from '../reducers/map';

export default () => {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : compose;

  const store = createStore(
    combineReducers({
      map
    }),
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );

  return store;
};
