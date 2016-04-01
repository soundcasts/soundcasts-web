const {just, combine} = require('most');
const querystring = require('querystring');
const isolate = require('@cycle/isolate');
const {div, form} = require('@motorcycle/dom');

const header = require('./header');
const footer = require('./footer');
const LabeledInput = require('./labeled-input');
const UrlField = require('./url-field');

module.exports = main;

function main(sources) {
  const userProps$ = just({
    label: 'https://soundcloud.com/user_id or user_id',
    placeholder: 'SoundCloud User ID',
    initial: ''
  });
  const titleProps$ = just({
    label: 'The title that will display in your podcast player',
    placeholder: 'Podcast Title',
    initial: ''
  });
  const regexProps$ = just({
    label: 'Case-insensitive regex filter (optional)',
    placeholder: 'Regex Filter (Optional)',
    initial: ''
  });

  const userSources = {DOM: sources.DOM, props$: userProps$};
  const titleSources = {DOM: sources.DOM, props$: titleProps$};
  const regexSources = {DOM: sources.DOM, props$: regexProps$};

  const userInput = isolate(LabeledInput)(userSources);
  const titleInput = isolate(LabeledInput)(titleSources);
  const regexInput = isolate(LabeledInput)(regexSources);

  const url$ = combine((user, title, regex) => {
      return toUrl(user, title, regex);
    }, userInput.value$, titleInput.value$, regexInput.value$
  );

  const urlFieldProps$ = just({
    placeholder: 'Your SoundCast URL', initial: ''
  });
  const urlFieldSources = {DOM: sources.DOM, props$: urlFieldProps$, url$};
  const urlField = isolate(UrlField)(urlFieldSources);

  const sinks = {
    DOM: url$.combine(
      (url, userVTree, titleVTree, regexVTree, urlFieldVTree) =>
        div([
          header,
          div([
            form([
              userVTree,
              titleVTree,
              regexVTree,
              urlFieldVTree
            ])
          ]),
          footer
        ]),
      userInput.DOM, titleInput.DOM, regexInput.DOM, urlField.DOM
    ),
    selections: urlField.selections$,
  };
  return sinks;
}

/*
URL Helpers
 */

const BASE_URL = 'http://api.soundcasts.net/soundcast.xml?';

function toUrl(title, user, regex) {
  return user && title ?
    BASE_URL + query(user, title, regex) : '';
}

function query(title, user, regex) {
  const baseParams = {'userId': user, title};
  const params = regex ? {...baseParams, regexString: regex} : baseParams;
  return querystring.stringify(params);
}
