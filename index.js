const {Observable} = require('rx');
const querystring = require('querystring');
const Cycle = require('@cycle/core');
const isolate = require('@cycle/isolate');
const {div, h2, p, makeDOMDriver} = require('@cycle/dom');

const LabeledInput = require('./components/labeled-input');

function main(sources) {
  const titleProps$ = Observable.of({
    label: 'Title', placeholder: 'Soundcast Title', initial: ''
  });
  const userProps$ = Observable.of({
    label: 'User ID', placeholder: 'SoundCloud user_id', initial: ''
  });
  const regexProps$ = Observable.of({
    label: 'Regex', placeholder: 'SoundCloud Regex Filter (Optional)', initial: ''
  });

  const titleSources = {DOM: sources.DOM, props$: titleProps$};
  const userSources = {DOM: sources.DOM, props$: userProps$};
  const regexSources = {DOM: sources.DOM, props$: regexProps$};

  const titleInput = isolate(LabeledInput)(titleSources);
  const userInput = isolate(LabeledInput)(userSources);
  const regexInput = isolate(LabeledInput)(regexSources);

  const titleVTree$ = titleInput.DOM;
  const titleValue$ = titleInput.value$;

  const userVTree$ = userInput.DOM;
  const userValue$ = userInput.value$;

  const regexVTree$ = regexInput.DOM;
  const regexValue$ = regexInput.value$;

  const url$ = Observable.combineLatest(titleValue$, userValue$, regexValue$,
    (title, user, regex) => {
      return toUrl(title, user, regex);
    }
  );

  const sinks = {
    DOM: url$.combineLatest(titleVTree$, userVTree$, regexVTree$,
      (url, userVTree, titleVTree, regexVTree) =>
        div([
          div('.header', [
            p('.title', 'Soundcasts'),
            p('.subtitle', 'Turn SoundCloud profiles into podcasts.')
          ]),
          div([
            userVTree,
            titleVTree,
            regexVTree,
            h2('URL is ' + url)
          ])
        ])
      )
  };
  return sinks;
}

const sources = {
  DOM: makeDOMDriver('#root')
};

Cycle.run(main, sources);


/*
URL Helpers
 */

var BASE_URL = 'http://api.soundcasts.net/soundcast.xml?';

function toUrl(title, user, regex) {
  return user && title ? BASE_URL + query(user, title, regex) : '';
}

function query(title, user, regex) {
  var params = {
    'user_id': user, title
  };
  if (regex) {
    params['regex'] = regex;
  }
  return querystring.stringify(params);
}
