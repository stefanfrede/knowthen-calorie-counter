import State from 'crocks/State';

import compose from 'crocks/helpers/compose';
import isNumber from 'crocks/predicates/isNumber';
import isString from 'crocks/predicates/isString';
import mapProps from 'crocks/helpers/mapProps';
import option from 'crocks/pointfree/option';
import prop from 'crocks/Maybe/prop';
import safe from 'crocks/Maybe/safe';

const { get, modify } = State;

// safeNumber :: a -> Number
export const safeNumber = compose(option(0), safe(isNumber), parseInt);

// safeString :: a -> String
export const safeString = compose(option(''), safe(isString));

// inc :: Number -> Number
export const inc = (x) => x + 1;

// omitID :: Array -> Number -> Array
export const omitId = (x) => (y) => y.filter((z) => z.id !== x);

// over :: (String, (a -> b)) -> Object -> State Object ()
export const over = (key, fn) => modify(mapProps({ [key]: fn }));

// getState :: String -> State Object (Maybe a)
export const getState = (key) => get(prop(key));
