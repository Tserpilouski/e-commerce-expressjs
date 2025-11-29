import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
    js.configs.recommended,
    {
        plugins: {
            'import': importPlugin,
            'unused-imports': unusedImports,
        },
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
            'no-unused-vars': 'off', // Turned off in favor of unused-imports

            // Import rules
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                { 'vars': 'all', 'varsIgnorePattern': '^_', 'args': 'after-used', 'argsIgnorePattern': '^_' }
            ],
            'import/no-unresolved': 'error',
            'import/named': 'error',

            // Best practices
            'eqeqeq': ['error', 'always'], // Require === and !==
            'no-var': 'error', // Require let or const instead of var
            'prefer-const': 'error', // Prefer const for variables that are never reassigned

            // Style (handled by Prettier, but keeping for reference)
            'quotes': ['error', 'single'], // Single quotes
            'semi': ['error', 'always'], // Require semicolons
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.mjs'],
                },
            },
        },
    },
    eslintConfigPrettier, // Disable ESLint rules that conflict with Prettier
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**'],
    },
];
