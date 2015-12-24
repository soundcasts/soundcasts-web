import * as CONSTANTS from './constants';


export function clone() {
  return Object.assign({}, ...arguments);
}


export function buildUrl(state) {
  var url = '';
  if (state.title.length && state.userId.length) {
    url = CONSTANTS.API_URL;
    url += '?title=' + encodeURIComponent(state.title);
    url += '&userId=' + encodeURIComponent(state.userId);
    url += '&regexString=' + encodeURIComponent(state.regexString);
  }
  return url;
}
