import flyd from 'flyd';

import initModel from '../model';

it('renders init model correctly', () => {
  const model = () => initModel;

  const update = flyd.stream();
  const models = flyd.scan((model, func) => func(model), model(), update);

  expect(models()).toMatchSnapshot();
});

it('updates init model correctly', () => {
  const model = () => initModel;
  const updatedModel = {
    description: 'Lunch',
    calories: 960,
    showForm: false,
    nextId: 0,
    editId: null,
    meals: [],
  };

  const update = flyd.stream();
  const models = flyd.scan((model, func) => func(model), model(), update);

  models(updatedModel);

  expect(models()).toMatchSnapshot();
});
