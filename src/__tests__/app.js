import app from '../app';

it('renders correctly', () => {
  const counter = app();

  expect(counter.model()).toMatchSnapshot();
  expect(counter.view()).toMatchSnapshot();
});
