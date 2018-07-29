import { combineReducers } from 'redux';

export function error(state = null, action) {
  switch (action.type) {
    case 'MAP_ERROR':
      return action.error;

    case 'MAP_RESET':
      return null;

    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'MAP_LOADING':
      return action.loading;

    case 'MAP_RESET':
      return false;

    default:
      return state;
  }
}

export function data(state = {}, action) {
  switch (action.type) {
    case 'MAP_SUCCESS':
      return {
        ...state,
        ...action.data
      };

    case 'MAP_RESET':
      return {};

    default:
      return state;
  }
}

export default combineReducers({ error, loading, data });
