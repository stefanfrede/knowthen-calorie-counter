import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import './assets/styles/index.css';
import fa from './assets/icons';

const fieldSet = ({
  labelText,
  inputId,
  inputType = 'text',
  inputValue = '',
  placeholder = '',
  required = false,
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
        ?required=${required}
        @input=${(e) => action(e.target.value)}
      />
    </div>
  </div>
`;

const buttonSet = (action) => html`
  <div>
    <div class="flex justify-end">
      <span class="inline-flex rounded-md shadow-sm">
        <button
          @click=${() => action(false)}
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
  <form
    @submit=${(e) => {
      e.preventDefault();

      actions.saveMeal();
    }}
  >
    ${showForm
      ? html`
          ${fieldSet({
            labelText: 'Meal',
            inputId: 'description',
            inputValue: description,
            placeholder: 'Add Meal',
            required: true,
            action: actions.descriptionMsg,
          })}
          ${fieldSet({
            labelText: 'Calories',
            inputId: 'calories',
            inputType: 'number',
            inputValue: calories || '',
            placeholder: 'Add Calories',
            required: true,
            action: actions.caloriesMsg,
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
          Calorie Counter ${unsafeHTML(fa.utensils)}
        </h3>
      </div>
      <div class="px-4 py-5 sm:p-6">
        ${formView({ actions, ...model })}
        ${model.meals.length
          ? html` <div class="flex flex-col mt-6">
              <div
                class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
              >
                <div
                  class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
                >
                  <table class="min-w-full">
                    <thead>
                      <tr>
                        <th
                          class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Meal
                        </th>
                        <th
                          class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Calories
                        </th>
                        <th
                          class="px-6 py-3 border-b border-gray-200 bg-gray-50"
                        ></th>
                      </tr>
                    </thead>
                    <tbody class="bg-white">
                      ${model.meals.map(
                        (meal) => html`
                          <tr>
                            <td
                              class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900"
                            >
                              ${meal.description}
                            </td>
                            <td
                              class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
                            >
                              ${meal.calories}
                            </td>
                            <td
                              class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                            >
                              <button
                                @click=${() => actions.deleteMeal(meal.id)}
                                class="px-1 text-pink-600 hover:text-pink-900"
                              >
                                ${unsafeHTML(fa.trash)}
                              </button>
                              <button
                                @click=${() => actions.editMeal(meal.id)}
                                class="px-1 text-pink-600 hover:text-pink-900"
                              >
                                ${unsafeHTML(fa.pencil)}
                              </button>
                            </td>
                          </tr>
                        `,
                      )}
                    </tbody>
                    <tfoot class="bg-white">
                      <tr>
                        <td
                          class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900"
                        >
                          Total
                        </td>
                        <td
                          class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
                        >
                          ${model.meals.reduce(
                            (acc, cur) => acc + cur.calories,
                            0,
                          )}
                        </td>
                        <td
                          class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                        ></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>`
          : html`
              <div class="mt-6 text-gray-400 italic">
                No meals to display...
              </div>
            `}

        <pre class="mt-6">${JSON.stringify(model, null, 2)}</pre>
      </div>
    </div>
  </section>
`;

export default createView;
