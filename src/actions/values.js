export const RESET = 'RESET';
export const EDIT_FIELD = 'EDIT_FIELD';


export function reset() {
  return { type: RESET };
}

export function editField(field, value) {
  return { type: EDIT_FIELD, field, value };
}
