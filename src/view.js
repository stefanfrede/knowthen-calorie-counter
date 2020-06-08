import { html } from 'lit-html';

import './assets/styles/index.css';
import icons from './assets/icons';

const { utensils: iconUtensils } = icons;

const fieldSet = ({
  labelText,
  inputId,
  inputType = 'text',
  inputValue = '',
  placeholder = '',
  action,
}) => html`
  <div class="mb-6">
    <label
      for="${inputId}"
      class="block text-sm font-medium leading-5 text-gray-700"
    >
      ${labelText}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        type="${inputType}"
        name="${inputId}"
        id="${inputId}"
        class="form-input block w-full sm:text-sm sm:leading-5"
        placeholder="${placeholder}"
        value="${inputValue}"
        @input=${(e) => action(e.target.value)}
      />
    </div>
  </div>
`;

const buttonSet = (showFormMsg) => html`
  <div>
    <div class="flex justify-end">
      <span class="inline-flex rounded-md shadow-sm">
        <button
          @click=${() => showFormMsg(false)}
          type="button"
          class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
        >
          Cancel
        </button>
      </span>
      <span class="ml-3 inline-flex rounded-md shadow-sm">
        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700 transition duration-150 ease-in-out"
        >
          Save
        </button>
      </span>
    </div>
  </div>
`;

const formView = ({ actions, description, calories, showForm }) => html`
  <form action="#" method="POST">
    ${showForm
      ? html`
          ${fieldSet({
            labelText: 'Meal',
            inputId: 'description',
            inputValue: description,
            placeholder: 'Add Meal',
            action: actions.mealInputMsg,
          })}
          ${fieldSet({
            labelText: 'Calories',
            inputId: 'calories',
            inputType: 'number',
            inputValue: calories || '',
            placeholder: 'Add Calories',
            action: actions.caloriesInputMsg,
          })}
          ${buttonSet(actions.showFormMsg)}
        `
      : html`
          <span class="inline-flex rounded-md shadow-sm">
            <button
              @click=${() => actions.showFormMsg(true)}
              type="button"
              class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-5 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-500 focus:outline-none focus:border-pink-700 focus:shadow-outline-pink active:bg-pink-700 transition ease-in-out duration-150"
            >
              Add Meal
            </button>
          </span>
        `}
  </form>
`;

const createView = (actions) => (model) => html`
  <section class="w-screen h-screen flex items-center justify-center">
    <div class="bg-white overflow-hidden shadow rounded-lg">
      <div class="border-b border-gray-200 px-4 py-5 sm:px-6">
        <h3 class="text-xl leading-7 font-semibold text-gray-900">
          Calorie Counter ${iconUtensils}
        </h3>
      </div>
      <div class="px-4 py-5 sm:p-6">
        ${formView({ actions, ...model })}

        <pre class="mt-6">${JSON.stringify(model, null, 2)}</pre>
      </div>
    </div>
  </section>
`;

export default createView;
