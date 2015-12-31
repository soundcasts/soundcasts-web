const {combine} = require('most');
const {div, span, input} = require('@motorcycle/dom');

module.exports = LabeledInput;

function LabeledInput(sources) {
  const initialValue$ = sources.props$
    .map(props => props.initial);

  const newValue$ = sources.DOM
    .select('.input')
    .events('input')
    .map(ev => ev.target.value);

  const value$ = initialValue$.concat(newValue$);

  const vtree$ = combine((props, value) =>
    div('.input-group', [
      input('.input', {
        type: 'text',
        autoCorrect: 'off',
        autoCapitalize: 'none',
        placeholder: props.placeholder,
        value
      }),
      span('.label', props.label + ' ' + value)
    ]), sources.props$, value$
  );

  const sinks = {
    DOM: vtree$,
    value$,
  };
  return sinks;
}
