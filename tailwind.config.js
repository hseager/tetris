module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        container: {
            center: true,
            padding: '1rem'
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}