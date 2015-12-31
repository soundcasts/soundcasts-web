const {just, combine} = require('most');
const querystring = require('querystring');
const Motorcycle = require('@motorcycle/core');
const isolate = require('@cycle/isolate');
const {div, h2, p, makeDOMDriver} = require('@motorcycle/dom');

const LabeledInput = require('./components/labeled-input');

function main(sources) {
  const titleProps$ = just({
    label: 'Title', placeholder: 'Soundcast Title', initial: ''
  });
  const userProps$ = just({
    label: 'User ID', placeholder: 'SoundCloud user_id', initial: ''
  });
  const regexProps$ = just({
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

  const url$ = combine((title, user, regex) => {
      return toUrl(title, user, regex);
    }, titleValue$, userValue$, regexValue$
  );

  const sinks = {
    DOM: url$.combine((url, userVTree, titleVTree, regexVTree) =>
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
        ]), titleVTree$, userVTree$, regexVTree$
      )
  };
  return sinks;
}

const sources = {
  DOM: makeDOMDriver('#root')
};

Motorcycle.run(main, sources);


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
