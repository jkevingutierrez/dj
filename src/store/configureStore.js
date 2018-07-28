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
  const store = createStore(
    combineReducers({
      // ...
    }),
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

  return store;
};
