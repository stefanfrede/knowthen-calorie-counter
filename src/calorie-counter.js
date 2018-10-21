import { createActions } from './actions';
import { createView } from './view';

export const createCalorieCounter = update => ({
  model: () => ({
    description: 'Breakfast',
    calories: 480,
    showForm: false,
    nextId: 0,
    editId: null,
    meals: [],
  }),

  view: createView(createActions(update)),
});
