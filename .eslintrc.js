/* eslint-env node */
module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: '18.2.0',
    },
  },
  ignorePatterns: ['.next/**'],
};
