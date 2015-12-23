import * as ACTIONS from '../actions/values';
import { clone } from '../util';


const initialState = {
  title: '',
  userId: '',
  regexString: '',
  url: ''
};


export default function values(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.RESET:
      return clone(initialState);

    case ACTIONS.EDIT_FIELD:
      state = clone(state, { [action.field]: action.value });
      let url = buildUrl(state);
      return clone(state, { url });

    default:
      return state;
  }
}


function buildUrl(state) {
  var url = '';
  if (state.title.length && state.userId.length) {
    url = 'http://api.soundcasts.net/soundcast.xml';
    url += '?title=' + encodeURIComponent(state.title);
    url += '&userId=' + encodeURIComponent(state.userId);
    url += '&regexString=' + encodeURIComponent(state.regexString);
  }
  return url;
}
