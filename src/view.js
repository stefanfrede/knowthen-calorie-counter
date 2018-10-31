import { html } from 'lit-html';

// eslint-disable-next-line no-unused-vars
const createView = actions => model => html`
  <div class="calorie-counter">
    <pre>${JSON.stringify(model, null, 2)}</pre>
  </div>
`;

export default createView;
