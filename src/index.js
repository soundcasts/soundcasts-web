import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './containers/App';
import rootReducer from './reducers';
import { r } from './util';


const store = createStore(rootReducer);

render(
  r(Provider, { store }, r(App)),
  document.getElementById('root')
);