import { stringify } from 'querystring';

import * as CONSTANTS from './constants';


export function clone() {
  return Object.assign({}, ...arguments);
}


export function buildSoundcastUrl(title, userId, regexString) {
  var url = '';
  if (title.length && userId.length) {
    url = CONSTANTS.API_URL;
    url += '?' + stringify({ title, userId });
    url += regexString ? '&' + stringify({ regexString }) : '';
  }
  return url;
}
