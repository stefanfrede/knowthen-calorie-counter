import State from 'crocks/State';

import compose from 'crocks/helpers/compose';
import isNumber from 'crocks/predicates/isNumber';
import isString from 'crocks/predicates/isString';
import mapProps from 'crocks/helpers/mapProps';
import option from 'crocks/pointfree/option';
import safe from 'crocks/Maybe/safe';
import setProp from 'crocks/helpers/setProp';

const { modify } = State;

// add :: Number -> Number -> Number
const add = (x) => (y) => x + y;

// omitID :: Array -> Number -> Array
const omitID = (x) => (y) => y.filter((z) => z.id !== x);

// safeNumber :: a -> Number
const safeNumber = compose(option(0), safe(isNumber), parseInt);

// safeString :: a -> String
const safeString = compose(option(''), safe(isString));

// showForm :: Boolean -> a -> State Object ()
const showForm = (show) => modify(setProp('showForm', show));

// insertMeal :: String -> a -> State Object  ()
const insertMeal = (meal) => modify(setProp('description', safeString(meal)));

// insertCalories :: Number -> a -> State Object  ()
const insertCalories = (calories) =>
  modify(setProp('calories', safeNumber(calories)));

// resetDescription :: () -> a -> State Object  ()
const resetDescription = () => modify(setProp('description', ''));

// resetCalories :: () -> a -> State Object  ()
const resetCalories = () => modify(setProp('calories', 0));

// closeForm :: () -> a -> State Object  ()
const closeForm = () => modify(setProp('showForm', false));

// increaseId :: () -> State Object ()
const increaseId = () => modify(mapProps({ nextId: add(1) }));

// saveMeal :: Object -> State Object ()
const saveMeal = ({ calories, description, meals, nextId: id }) => {
  return modify(
    setProp('meals', [
      ...meals,
      {
        id,
        description,
        calories,
      },
    ]),
  );
};

// deleateMeal :: Number -> State Object ()
const deleteMeal = (id) => modify(mapProps({ meals: omitID(id) }));

const createActions = (update) => ({
  showFormMsg: (show) =>
    update((model) =>
      showForm(show)
        .chain(resetDescription)
        .chain(resetCalories)
        .execWith(model),
    ),
  mealInputMsg: (meal) => update((model) => insertMeal(meal).execWith(model)),
  caloriesInputMsg: (calories) =>
    update((model) => insertCalories(calories).execWith(model)),
  saveMeal: () =>
    update((model) =>
      saveMeal(model)
        .chain(resetDescription)
        .chain(resetCalories)
        .chain(increaseId)
        .chain(closeForm)
        .execWith(model),
    ),
  deleteMeal: (id) => update((model) => deleteMeal(id).execWith(model)),
});

export default createActions;
