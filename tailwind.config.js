/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        highlight: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      screens: {
        narrow: { raw: '(max-aspect-ratio: 1 / 1)' },
        wide: { raw: '(min-aspect-ratio: 1 / 1)' },
        'taller-than-854': { raw: '(min-height: 854px)' },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
