module.exports = {
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  rules: {
    'max-len': ['error', {
      code: 140,
    },
    ],
    'no-plusplus': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
        ],
      },
    ],
  },
};
