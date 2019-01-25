import { icon, library } from '@fortawesome/fontawesome-svg-core';

import { faUtensils } from '@fortawesome/pro-regular-svg-icons';

library.add(faUtensils);

export default {
  utensils: icon(faUtensils, { classes: ['fa-fw'] }).node,
};
