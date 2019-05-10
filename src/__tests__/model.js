import initModel from '../model';

it('renders correctly', () => {
  const model = initModel;

  expect(model).toMatchSnapshot();
});
