import tailwindcssForms from '@tailwindcss/forms';
import colors from 'tailwindcss/colors';

const config = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        gray: colors.slate,
      },
    },
  },
  plugins: [tailwindcssForms],
};

export default config;
