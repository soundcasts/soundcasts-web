const {combine, merge} = require('most');
const {div} = require('@motorcycle/dom');

module.exports = UrlField;

function UrlField(sources) {
  const initialValue$ = sources.props$
    .map(props => props.initial);

  const value$ = initialValue$.concat(sources.url$);

  const urlDOM = sources.DOM.select('.url');
  const clicks$ = urlDOM.events('focusin').map(ev => ev.target);
  const outs$ = urlDOM.events('focusout').map(() => false);

  const selections$ = merge(clicks$, outs$);

  const vtree$ = combine((props, value) =>
    div('.url', {
      class: {disabled: !value},
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
