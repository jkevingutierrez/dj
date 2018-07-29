export function error(error) {
  return { type: 'MAP_ERROR', error };
}

export function loading(loading) {
  return { type: 'MAP_LOADING', loading };
}

export function success(data) {
  return { type: 'MAP_SUCCESS', data };
}

export function reset() {
  return { type: 'MAP_RESET' };
}
