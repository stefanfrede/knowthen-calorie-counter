import createActions from '../actions';

it('renders correctly', () => {
  const actions = createActions();

  expect(actions).toMatchSnapshot();
});
