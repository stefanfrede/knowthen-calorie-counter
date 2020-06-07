import State from 'crocks/State';

import setProp from 'crocks/helpers/setProp';

const { modify } = State;

// showForm :: Boolean -> a -> State Object ()
const showForm = (show) => modify(setProp('showForm', show));

// resetDescription :: () -> Object  ()
const resetDescription = () => modify(setProp('description', ''));

// resetCalories :: () -> State Object ()
const resetCalories = () => modify(setProp('calories', 0));

const createActions = (update) => ({
  showFormMsg: (show) =>
    update((model) =>
      showForm(show)
        .chain(resetDescription)
        .chain(resetCalories)
        .execWith(model),
    ),
});

export default createActions;
