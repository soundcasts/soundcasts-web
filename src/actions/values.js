import * as ACTIONS from './constants';


export function reset() {
  return { type: ACTIONS.RESET };
}

export function editField(field, value) {
  return { type: ACTIONS.EDIT_FIELD, field, value };
}
