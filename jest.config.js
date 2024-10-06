// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/jest.setup.js'], // Ensure this path is correct
    modulePathIgnorePatterns: [
        '<rootDir>/.vscode/',
        '<rootDir>/path/to/other/projects/',  // Adjust this path to ignore other projects
    ],
};