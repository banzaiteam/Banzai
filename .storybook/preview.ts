import type { Preview } from '@storybook/react'
import '@radix-ui/themes/styles.css'; // Основные стили Radix
import '@shared/styles/global.css'; //

const preview: Preview = {
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