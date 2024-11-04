/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'vuetify',
    '@vue/eslint-config-typescript',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    'vue/script-indent': 'off',
    'vue/multi-word-component-names': 'off',
    'no-trailing-spaces': 'warn',
    'no-unused-vars': 'warn',
    'comma-dangle': 'off',
    'func-call-spacing': 'off',
  },
}
