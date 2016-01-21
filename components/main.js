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
  const titleProps$ = just({
    label: 'Podcast Title',
    placeholder: 'The title that will display in your podcast player',
    initial: ''
  });
  const userProps$ = just({
    label: 'SoundCloud User ID',
    placeholder: 'https://soundcloud.com/user_id or user_id',
    initial: ''
  });
  const regexProps$ = just({
    label: 'Regex Filter (Optional)',
    placeholder: 'Case-Insensitive Regex Filter (Optional)',
    initial: ''
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
    DOM: url$.combine(
      (url, titleVTree, userVTree, regexVTree, urlFieldVTree) =>
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
      titleInput.DOM, userInput.DOM, regexInput.DOM, urlField.DOM
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
  const baseParams = {title, 'user_id': user};
  const params = regex ? {...baseParams, regexString: regex} : baseParams;
  return querystring.stringify(params);
}
