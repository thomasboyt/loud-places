module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 'off',
  },
};
