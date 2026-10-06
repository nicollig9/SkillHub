/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        logo: {
          darkest: '#140A23',
          darker: '#1C0D33',
          dark: '#24123E',
          main: '#351859',
          vibrant: '#4F2684',
          accent: '#6D34A8',
          light: '#8B5CF6',
          soft: '#DDD6FE',
          softest: '#F5F3FF',
        },
        dark: {
          base: '#0C0717',
          card: '#160B29',
          surface: '#1E0E37',
          border: '#3F1F68',
          hover: '#522886'
        }
      },
      backgroundImage: {
        'logo-purple-header': 'linear-gradient(135deg, #22103B 0%, #351859 50%, #481F78 100%)',
        'logo-purple-hero': 'linear-gradient(135deg, #24123E 0%, #351859 50%, #4A207A 100%)',
        'logo-purple-card': 'linear-gradient(145deg, #180C2E 0%, #261343 100%)',
      }
    },
  },
  plugins: [],
};
