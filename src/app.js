import createActions from './actions';
import createView from './view';
import initModel from './model';

const app = update => ({
  model: () => initModel,

  view: createView(createActions(update)),
});

export default app;
