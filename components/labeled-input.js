const {combine} = require('most');
const {div, label, input} = require('@motorcycle/dom');

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
        attrs: {placeholder: props.placeholder},
        value
      }),
      label('.label', props.label)
    ]), sources.props$, value$
  );

  const sinks = {
    DOM: vtree$,
    value$,
  };
  return sinks;
}
