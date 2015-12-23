export function clone() {
  var args = Array.from(arguments);
  return Object.assign({}, ...args);
}
