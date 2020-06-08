import State from 'crocks/State';

import compose from 'crocks/helpers/compose';
import isNumber from 'crocks/predicates/isNumber';
import isString from 'crocks/predicates/isString';
import option from 'crocks/pointfree/option';
import safe from 'crocks/Maybe/safe';
import setProp from 'crocks/helpers/setProp';

const { modify } = State;

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

const createActions = (update) => ({
  showFormMsg: (show) =>
    update((model) =>
      showForm(show).chain(insertMeal).chain(insertCalories).execWith(model),
    ),
  mealInputMsg: (meal) => update((model) => insertMeal(meal).execWith(model)),
  caloriesInputMsg: (calories) =>
    update((model) => insertCalories(calories).execWith(model)),
});

export default createActions;
