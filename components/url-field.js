const csjs = require('csjs-inject');
const {combine, merge} = require('most');
const {div} = require('@motorcycle/dom');

module.exports = UrlField;

function UrlField(sources) {
  const initialValue$ = sources.props$
    .map(props => props.initial);

  const value$ = initialValue$.concat(sources.url$);

  const urlDOM = sources.DOM.select(styles.url.selector);
  const clicks$ = urlDOM.events('focusin').map(ev => ev.target);
  const outs$ = urlDOM.events('focusout').map(() => false);

  const selections$ = merge(clicks$, outs$);

  const vtree$ = combine((props, value) =>
    div(styles.url.selector, {
      class: {[styles.disabled]: !value},
      attrs: value ? {tabindex: 0} : null
    }, value ? value : props.placeholder),
    sources.props$,
    value$
  );

  const sinks = {
    DOM: vtree$,
    selections$
  };
  return sinks;
}


const styles = csjs`
  
  .url {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    outline: none;
    margin: 35px 0 48px;
    padding: 16px;
    transition: opacity 200ms ease-in-out;
    word-wrap: break-word;
  }
  
  .disabled {
    cursor: not-allowed;
    opacity: 0.4;
    user-select: none;
  }
  
`;
