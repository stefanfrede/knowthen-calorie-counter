import { html } from 'lit-html';

import './assets/styles/index.css';
import icons from './assets/icons';

const { utensils: iconUtensils } = icons;

// eslint-disable-next-line no-unused-vars
const createView = (actions) => (model) => html`
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">
            Calorie Counter ${iconUtensils}
          </h3>
          <div class="box">
            <pre>${JSON.stringify(model, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

export default createView;
