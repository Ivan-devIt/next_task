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
      screens: {
        sl: '320px',
        ss: '360px',
        ml: '428px',
        ms: '480px',
        mm: '576px',
        sm: '680px',
        md: '768px',
        lm: '992px',
        lg: '1024px',
        xl: '1280px',
        '1xl': '1366px',
        '3xl': '1760px',
        '4xl': '1920px',
        '5xl': '2560px'
      },

      fontSize: {
        mm: ['0.875rem', '1.25rem'], // (size:14px line-height:20px)
        sm: ['0.9375rem', '1.5rem'], // (size:15px line-height:24px)
        ml: ['1rem', '1.5rem'], // (size:16px line-height:24px)
        md: ['1.125rem', '1.6875rem'], // (size:18px line-height:27px)
        xl: ['1.5rem', '2.25rem'], // (size:24px line-height:36px)
        '1xl': ['2.5rem', '3.75rem'], // (size:40px line-height:60px)
        '2xl': ['2rem', '3rem'], // (size:32px line-height:48px)
        '3xl': ['1.5rem', '2.25rem'], // (size:24px line-height:36px)
        '4xl': ['1.125rem', '1.688rem'], // (size:18px line-height:27px)
        '5xl': ['2rem', '3rem'], // (size:32px line-height:48px)
        '6xl': ['1.1rem', '1.6rem'] // (size:17px line-height:25px)
      },

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

      gridTemplateRows: {
        layout: 'auto 1fr auto'
      },

      colors: {
        primary: '#42ABDE',
        primaryDark: '#2194CC',
        secondaryDark: '#231F20',
        gray: '#808080',
        black: '#231F20',
        lightGray: '#F8F8F8',
        gainsboro: '#DDDDDD',
        rose: '#E35F5E',
        green: '#5BB984',
        whitePrimary: '#ffffff'
      }
    }
  },
  plugins: [
    // Enable the text shadow plugin
  ]
};
export default config;
