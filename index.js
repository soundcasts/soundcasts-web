const Motorcycle = require('@motorcycle/core');
const {makeDOMDriver} = require('@motorcycle/dom');

const selectionDriver = require('./drivers/selection-driver');

const main = require('./components/main');

const root = document.body.appendChild(document.createElement('div'));

const sources = {
  DOM: makeDOMDriver(root),
  selections: selectionDriver,
};

Motorcycle.run(main, sources);
