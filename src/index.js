import flyd from 'flyd';
import { render } from 'lit-html';

import app from './app';

const update = flyd.stream();
const counter = app(update);
const models = flyd.scan((model, func) => func(model), counter.model(), update);

const node = document.getElementById('app');
models.map(model => render(counter.view(model), node));
