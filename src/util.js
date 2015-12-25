import * as CONSTANTS from './constants';


export function clone() {
  return Object.assign({}, ...arguments);
}


export function buildUrl(title, userId, regexString) {
  var url = '';
  if (title.length && userId.length) {
    url = CONSTANTS.API_URL;
    url += '?title=' + encodeURIComponent(title);
    url += '&userId=' + encodeURIComponent(userId);
    url += regexString ? '&regexString=' + encodeURIComponent(regexString) : '';
  }
  return url;
}
