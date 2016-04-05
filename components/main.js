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
    initial: '',
    inputAttrs: {
      placeholder: 'SoundCloud User ID',
      autoCorrect: 'off',
      autoCapitalize: 'none',
    },
  });
  const titleProps$ = just({
    label: 'The title that will display in your podcast player',
    initial: '',
    inputAttrs: {
      placeholder: 'Podcast Title',
      autoCorrect: 'off',
      autoCapitalize: 'words',
    },
  });
  const regexProps$ = just({
    label: 'Case-insensitive regex filter (optional)',
    initial: '',
    inputAttrs: {
      placeholder: 'Regex Filter (Optional)',
      autoCorrect: 'off',
      autoCapitalize: 'none',
    },
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

const BASE_URL = 'https://api.soundcasts.net/soundcast.xml?';
const SOUNDCLOUD_URL_REGEX = /soundcloud.com\/([^\?#\/]+).*$/i;

function toUrl(user, title, regex) {
  const userId = getUserId(user);
  const url = () => BASE_URL + query(userId, title, regex);
  return user && title ? url() : '';
}

function getUserId(urlOrId) {
  const result = SOUNDCLOUD_URL_REGEX.exec(urlOrId);
  return result ? result[1] : urlOrId;
}

function query(user, title, regex) {
  const baseParams = {'userId': user, title};
  const params = regex ? {...baseParams, regexString: regex} : baseParams;
  return querystring.stringify(params);
}
