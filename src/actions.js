import constant from 'crocks/combinators/constant';
import setProp from 'crocks/helpers/setProp';

import { inc, omitId, over, safeNumber, safeString } from './helpers';

// incMoves :: () -> State AppState ()
const incNextId = () => over('nextId', inc);

// setShowForm :: Boolean -> State AppState ()
const setShowForm = (showForm) => over('showForm', constant(showForm));

// setDescription :: String -> State AppState ()
const setDescription = (description) =>
  over('description', constant(safeString(description)));

// setCalories :: String -> State AppState ()
const setCalories = (calories) =>
  over('calories', constant(safeNumber(calories)));

// resetDescription :: () -> State AppState ()
const resetDescription = () => over('description', constant(''));

// resetCalories :: () -> State AppState ()
const resetCalories = () => over('calories', constant(0));

// closeForm :: () -> State AppState ()
const closeForm = () => over('showForm', constant(false));

// saveMeal :: Object -> State App State ()
const saveMeal = ({ calories, description, meals, nextId: id }) =>
  over(
    'meals',
    setProp(meals.length, {
      id,
      description,
      calories,
    }),
  );

// deleateMeal :: Number -> State App State ()
const deleteMeal = (id) => over('meals', omitId(id));

const createActions = (update) => ({
  showFormMsg: (showForm) =>
    update((model) =>
      setShowForm(showForm)
        .chain(resetDescription)
        .chain(resetCalories)
        .execWith(model),
    ),
  descriptionMsg: (description) =>
    update((model) => setDescription(description).execWith(model)),
  caloriesMsg: (calories) =>
    update((model) => setCalories(calories).execWith(model)),
  saveMeal: () =>
    update((model) =>
      saveMeal(model)
        .chain(resetDescription)
        .chain(resetCalories)
        .chain(incNextId)
        .chain(closeForm)
        .execWith(model),
    ),
  deleteMeal: (id) => update((model) => deleteMeal(id).execWith(model)),
});

export default createActions;
