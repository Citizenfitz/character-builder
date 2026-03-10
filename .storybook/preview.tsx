import type { Preview } from '@storybook/react-webpack5';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import '../src/style.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div id="questrex-char-builder-root" style={{ position: 'relative', padding: '1rem' }}>
          <div id="questrex-modal-container" style={{ position: 'relative' }} />
          <Story />
        </div>
      </Provider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
