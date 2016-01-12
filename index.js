const {just, combine} = require('most');
const querystring = require('querystring');
const Motorcycle = require('@motorcycle/core');
const isolate = require('@cycle/isolate');
const {div, h2, form, makeDOMDriver} = require('@motorcycle/dom');

const header = require('./header');
const footer = require('./footer');
const LabeledInput = require('./components/labeled-input');
const UrlField = require('./components/url-field');
const selectionDriver = require('./drivers/selection-driver');

function main(sources) {
  const titleProps$ = just({
    label: 'Podcast Title', placeholder: 'The title that will display in your podcast player', initial: ''
  });
  const userProps$ = just({
    label: 'SoundCloud User ID', placeholder: 'https://soundcloud.com/user_id or user_id', initial: ''
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

  const url$ = combine((title, user, regex) => {
      return toUrl(title, user, regex);
    }, titleInput.value$, userInput.value$, regexInput.value$
  );

  const urlFieldProps$ = just({
    placeholder: 'Your SoundCast URL', initial: ''
  });
  const urlFieldSources = {DOM: sources.DOM, props$: urlFieldProps$, url$};
  const urlField = isolate(UrlField)(urlFieldSources);

  const sinks = {
    DOM: url$.combine((url, userVTree, titleVTree, regexVTree, urlFieldVTree) =>
      div([
        header,
        div([
          form([
            userVTree,
            titleVTree,
            // regexVTree,
            urlFieldVTree
          ])
        ]),
        footer
      ]), titleInput.DOM, userInput.DOM, regexInput.DOM, urlField.DOM
    ),
    selections: urlField.selections$,
  };
  return sinks;
}

const sources = {
  DOM: makeDOMDriver('#root'),
  selections: selectionDriver,
};

Motorcycle.run(main, sources);

/*
URL Helpers
 */

const BASE_URL = 'http://api.soundcasts.net/soundcast.xml?';

function toUrl(title, user, regex) {
  return user && title ? BASE_URL + query(user, title, regex) : '';
}

function query(title, user, regex) {
  const baseParams = {'user_id': user, title};
  const params = regex ? {...baseParams, regex} : baseParams;
  return querystring.stringify(params);
}
