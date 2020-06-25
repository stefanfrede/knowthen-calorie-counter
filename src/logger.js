const isNil = (x) => x === undefined || x === null;

const when = (pred, f) => (x) => (pred(x) ? f(x) : x);

const hasInspect = (x) => !isNil(x) && typeof x.inspect === 'function';

const inspect = when(hasInspect, (x) => x.inspect());

export default function log(...args) {
  if (!args.length) {
    console.log(undefined);
    return undefined;
  } else if (args.length > 1) {
    console.log(inspect(args[1]), args[0]);
    return args[1];
  }

  console.log(inspect(args[0]));
  return args[0];
}
