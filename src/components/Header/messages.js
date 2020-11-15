/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Header';

export default defineMessages({
  header: {
    id: `${scope}.home`,
    defaultMessage: 'This is the Header component!',
  },
  homeButton: {
    id: `${scope}.butotn.home`,
    defaultMessage: 'Home',
  },
  aboutButton: {
    id: `${scope}.butotn.about`,
    defaultMessage: 'About',
  },
});
