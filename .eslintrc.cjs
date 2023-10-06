const path = require('path');

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        createDefaultProgram: true,
        project: './tsconfig.json'
    },
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'eslint:recommended',
        'prettier',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:react/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks'],
    rules: {
        'no-console': 'warn',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        "no-restricted-exports": "off",
        "import/prefer-default-export": "off",
        "react/require-default-props": "off",
        'react/jsx-props-no-spreading': 'off',
        "no-underscore-dangle": "off",
        "react/function-component-definition": [
            "error",
            {
                "namedComponents": "arrow-function",
                "unnamedComponents": "arrow-function"
            }
        ],
        'import/order': ['error', {
            'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'pathGroups': [
                {
                    'pattern': 'mobx-react-lite',
                    'group': 'external',
                    'position': 'before'
                },
            ],
            'pathGroupsExcludedImportTypes': ['builtin'],
            'newlines-between': 'always',
            'alphabetize': {
                order: 'asc',
                caseInsensitive: true
            }
        }],

    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.scss', '.svg', '.png', '.jpg'],
        },

        "import/resolver": {
            webpack: {
                config: './webpack.config.js',
            },
            typescript: {
                alwaysTryTypes: true
            }
        },

        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        react: {
            version: 'detect',
        },

    },

};