import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
        },
        rules: {
            // Possible errors
            'no-console': 'off', // Allow console.log in Node.js
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

            // Best practices
            'eqeqeq': ['error', 'always'], // Require === and !==
            'no-var': 'error', // Require let or const instead of var
            'prefer-const': 'error', // Prefer const for variables that are never reassigned

            // Style (handled by Prettier, but keeping for reference)
            'quotes': ['error', 'single'], // Single quotes
            'semi': ['error', 'always'], // Require semicolons
        },
    },
    eslintConfigPrettier, // Disable ESLint rules that conflict with Prettier
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**'],
    },
];
