/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'twitter-blue': '#00ADED',
                'twitter-dark': '#14171A',
                'twitter-light': '#E1E8ED',
                'twitter-gray': '#657786',
                'twitter-white': '#FFFFFF'
            }
        }
    },
    plugins: [
        require('tailwind-scrollbar-hide')
        // ...
    ]
};
