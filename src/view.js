import { html } from 'lit-html';

import './assets/styles/index.css';
import icons from './assets/icons';

const { utensils: iconUtensils } = icons;

// eslint-disable-next-line no-unused-vars
const createView = (actions) => (model) => html`
  <section class="w-screen h-screen flex items-center justify-center">
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
        <h3 class="text-xl leading-7 font-semibold text-gray-900">
          Calorie Counter ${iconUtensils}
        </h3>
      </div>
      <div class="px-4 py-5 sm:p-6">
        <pre>${JSON.stringify(model, null, 2)}</pre>
      </div>
    </div>
  </section>
`;

export default createView;
