import createView from '../view';

it('renders correctly', () => {
  const view = createView({})({});

  expect(view).toMatchSnapshot();
});
