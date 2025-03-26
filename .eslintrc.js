/* eslint-env node */
export const env = {
  node: true,
  browser: true,
  es2022: true,
};
export const parserOptions = {
  ecmaFeatures: {
    jsx: true,
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
};
export const plugins = ['react', 'prettier'];
// export const rules = {
//   'react/react-in-jsx-scope': 'off',
//   'react/jsx-uses-react': 'off',
//   'react/prop-types': 'off',
//   'no-unused-vars': 'warn', // Make unused vars warnings instead of errors
// };
export const settings = {
  react: {
    version: '18.2.0', // Explicitly set your React version (or 'detect')
  },
};
export const ignorePatterns = ['.next/**'];
