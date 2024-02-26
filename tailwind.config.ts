import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },

      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.2)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.4)',
        xl: '4px 4px 8px rgba(0, 0, 0, 0.5)'
      },

      screens: {
        mm: '576px',
        '3xl': '1760px',
        '4xl': '1920px',
        '5xl': '2560px'
      },

      gridTemplateRows: {
        layout: 'auto 1fr auto'
      }
    }
  },
  plugins: [
    // Enable the text shadow plugin
  ]
};
export default config;
