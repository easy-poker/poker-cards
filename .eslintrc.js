const srcDependencies = {
  devDependencies: false,
  optionalDependencies: false,
  peerDependencies: false,
};

const devDependencies = {
  devDependencies: true,
  optionalDependencies: false,
  peerDependencies: false,
};

const testFilePatterns = (extensions = '*') =>
  ['**/*.test', '**/*.mock', '**/__test__/**/*', '**/__mocks__/**/*'].map(
    (pattern) => `${pattern}.${extensions}`,
  );

module.exports = {
  root: true,
  env: { es6: true, node: true },
  reportUnusedDisableDirectives: true,
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
    'import/resolver': {
      'eslint-import-resolver-typescript': { project: './tsconfig.json' },
    },
  },
  plugins: ['filenames'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    'curly': ['warn', 'multi-line', 'consistent'],
    'no-console': 'off',
    'no-throw-literal': 'error',
    'filenames/match-regex': ['error', '^[a-z0-9-.]+$', true],
    'filenames/match-exported': ['error', 'kebab'],
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-unused-modules': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-extraneous-dependencies': ['error', devDependencies],
    'import/order': [
      'warn',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'type',
        ],
        'pathGroups': [{ pattern: '~/**', group: 'internal' }],
        'pathGroupsExcludedImportTypes': ['type'],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': 'warn',
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: './tsconfig.json' },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
      ],
      rules: {
        'camelcase': 'off',
        'no-shadow': 'off',
        'no-throw-literal': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { disallowTypeAnnotations: false },
        ],
        '@typescript-eslint/member-ordering': ['warn'],
        '@typescript-eslint/no-shadow': [
          'error',
          {
            ignoreTypeValueShadow: false,
            ignoreFunctionTypeParameterNameValueShadow: true,
          },
        ],
        '@typescript-eslint/no-throw-literal': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
      },
    },
    {
      files: ['./*'],
      rules: {
        'filenames/match-exported': 'off',
      },
    },
    {
      files: ['src/**/*'],
      env: { node: false, browser: false },
      plugins: ['tsdoc'],
      rules: {
        'no-console': 'error',
        'import/no-extraneous-dependencies': ['error', srcDependencies],
        'tsdoc/syntax': 'warn',
      },
    },
    {
      files: testFilePatterns(),
      env: { 'jest/globals': true },
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        'no-console': 'off',
        'import/no-extraneous-dependencies': ['error', devDependencies],
      },
    },
    {
      files: testFilePatterns('ts'),
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],
};
