import { icon, library } from '@fortawesome/fontawesome-svg-core';

import {
  faPencil,
  faTrash,
  faUtensils,
} from '@fortawesome/pro-regular-svg-icons';

library.add(faPencil);
library.add(faTrash);
library.add(faUtensils);

const [pencil] = icon(faPencil, { classes: ['fa-fw'] }).html;
const [trash] = icon(faTrash, { classes: ['fa-fw'] }).html;
const [utensils] = icon(faUtensils, { classes: ['fa-fw'] }).html;

export default { pencil, trash, utensils };
