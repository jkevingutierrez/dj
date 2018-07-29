import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import ... from '../reducers/...';
// import user from '../reducers/user/';
// import course from '../reducers/course/';
// import organization from '../reducers/organization/';
// import classroom from '../reducers/classroom/';
// import language from '../reducers/language/';
// import location from '../reducers/location/';
// import educationalMaterial from '../reducers/educational-material/';
// import classCalendar from '../reducers/classCalendar';
// import parameters from '../reducers/parameters';

export default () => {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
      : compose;

  const store = createStore(
    combineReducers({
      // ...
    }),
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );

  return store;
};
