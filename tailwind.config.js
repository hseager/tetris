module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        container: {
            center: true,
            padding: '1rem'
        },
        gridTemplateRows: {
            '20': 'repeat(20, minmax(0, 1fr))'
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}