const {Observable} = require('rx');
const {div, span, input} = require('@cycle/dom');

module.exports = LabeledInput;

function LabeledInput(sources) {
  const initialValue$ = sources.props$
    .map(props => props.initial)
    .first();

  const newValue$ = sources.DOM
    .select('.input')
    .events('input')
    .map(ev => ev.target.value);

  const value$ = initialValue$.concat(newValue$);

  const vtree$ = Observable.combineLatest(sources.props$, value$,
    (props, value) =>
      div('.input-group', [
        input('.input', {
          type: 'text',
          autoCorrect: 'off',
          autoCapitalize: 'none',
          placeholder: props.placeholder,
          value
        }),
        span('.label',
          props.label + ' ' + value
        )
      ])
  );

  const sinks = {
    DOM: vtree$,
    value$,
  };
  return sinks;
}
