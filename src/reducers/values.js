import * as ACTIONS from '../actions/constants';
import { clone, buildUrl } from '../util';


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
