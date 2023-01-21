module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prefer-arrow'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:node/recommended',
    'plugin:security/recommended',
    'plugin:unicorn/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // 'unicorn/prefer-top-level-await': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'node/exports-style': ['error', 'module.exports'],
    'node/file-extension-in-import': 'off',
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    'node/no-missing-import': [
      'error',
      {
        allowModules: [],
        resolvePaths: ['src/*'],
        tryExtensions: ['.js', '.json', '.node', '.ts', '.tsx'],
      },
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
  },
};
