const csjs = require('csjs-inject');
const {combine} = require('most');
const {div, label, input} = require('@motorcycle/dom');

module.exports = LabeledInput;

function LabeledInput(sources) {
  const initialValue$ = sources.props$
    .map(props => props.initial);

  const newValue$ = sources.DOM
    .select(styles.input.selector)
    .events('input')
    .map(ev => ev.target.value);

  const value$ = initialValue$.concat(newValue$);

  const vtree$ = combine((props, value) =>
    div([
      input(styles.input.selector, {
        attrs: Object.assign(
          { type: 'text', value },
          props.inputAttrs || {}
        )
      }),
      label(props.label)
    ]), sources.props$, value$
  );

  const sinks = {
    DOM: vtree$,
    value$,
  };
  return sinks;
}


const styles = csjs`

  .input {
    appearance: none;
    background: rgba(255, 255, 255, 0.97);
    border-radius: 4px;
    border: 0;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    color: #212121;
    display: block;
    font-size: 16px;
    font-weight: 400;
    height: 3em;
    line-height: 1;
    margin-bottom: 4px;
    margin-top: 24px;
    outline: 0;
    padding: 4px 16px;
    text-align: center;
    transition: all 0.2s ease-in-out;
    width: 100%;
  }

  .input:focus::placeholder {
    color: transparent;
  }

`;
