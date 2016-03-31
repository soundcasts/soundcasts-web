const Motorcycle = require('@motorcycle/core');
const {makeDOMDriver} = require('@motorcycle/dom');

const selectionDriver = require('./drivers/selection-driver');

const main = require('./components/main');

const rootElement = document.createElement('div');
rootElement.id = 'root';
const root = document.body.appendChild(rootElement);

const sources = {
  DOM: makeDOMDriver(root),
  selections: selectionDriver,
};

Motorcycle.run(main, sources);
