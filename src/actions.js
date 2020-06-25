import State from 'crocks/State';

import chain from 'crocks/pointfree/chain';
import constant from 'crocks/combinators/constant';
import curry from 'crocks/helpers/curry';
import filter from 'crocks/pointfree/filter';
import find from 'crocks/Maybe/find';
import option from 'crocks/pointfree/option';
import propEq from 'crocks/predicates/propEq';
import setProp from 'crocks/helpers/setProp';

// import log from './logger';

import {
  getState,
  inc,
  over,
  safeNumber,
  safeString,
  selectState,
} from './helpers';

const { modify } = State;

// incMoves :: () -> State AppState ()
const incNextId = () => over('nextId', inc);

// getMeal :: Number -> State AppState Meal
const getMeal = (id) =>
  getState('meals')
    .map(chain(find(propEq('id', id))))
    .map(option({ id, description: 'unknown', calories: 'unknown' }));

const notId = curry((id, meal) => meal.id !== id);

// omitMeal :: Number -> State AppState [ Meal ]
const omitMeal = (id) =>
  selectState('meals', filter(notId(id))).map(option([]));

// setCalories :: String -> State AppState ()
const setCalories = (calories) =>
  over('calories', constant(safeNumber(calories)));

// setDescription :: String -> State AppState ()
const setDescription = (description) =>
  over('description', constant(safeString(description)));

// setEditId :: String -> State AppState ()
// const setEditId = (id) => over('editId', constant(safeNumber(id)));

// setShowForm :: Boolean -> State AppState ()
const setShowForm = (showForm) => over('showForm', constant(showForm));

// resetCalories :: () -> State AppState ()
const resetCalories = () => setCalories(0);

// resetDescription :: () -> State AppState ()
const resetDescription = () => setDescription('');

// resetEditId :: () -> State AppState ()
// const resetEditId = () => setEditId(null);

// showForm :: () -> State AppState ()
const showForm = () => setShowForm(true);

// hideForm :: () -> State AppState ()
const hideForm = () => setShowForm(false);

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

// editMeal :: Number -> State App State Meal
const editMeal = (id) => {
  // TODO: Figure out the flow
  // ✔ Get meal from meals with id
  // Update description with meal description
  // Update calories with meal description
  // Update editId with meal id
  // ✔ Show form
  return getMeal(id).chain(showForm);
};

// deleateMeal :: Number -> State App State ()
// TODO: Figure out how to save the resultant in state
const deleteMeal = (id) => modify(setProp('meals', omitMeal(id)));

// const model = {
//   description: '',
//   calories: 0,
//   showForm: false,
//   nextId: 2,
//   editId: null,
//   meals: [
//     {
//       id: 0,
//       description: 'Breakfast',
//       calories: 480,
//     },
//     {
//       id: 1,
//       description: 'Lunch',
//       calories: 650,
//     },
//   ],
// };

// log(omitMeal(1).evalWith(model));

// Result:
// [
//   {
//     id: 0,
//     description: 'Breakfast',
//     calories: 480,
//   },
// ]

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
        .chain(hideForm)
        .execWith(model),
    ),
  editMeal: (id) => update((model) => editMeal(id).execWith(model)),
  deleteMeal: (id) => update((model) => deleteMeal(id).execWith(model)),
});

export default createActions;
