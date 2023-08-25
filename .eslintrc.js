module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'simple-import-sort', 'filename-rules'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'max-len': [
      'error',
      {
        code: 120,
        comments: 150,
        ignoreUrls: true,
        ignorePattern: '^import \\{ \\w+ \\} from ',
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        line: { exceptions: ['-+'] },
        block: { exceptions: ['!'] },
      },
    ],
    // "@typescript-eslint/indent": "warn",
    // "linebreak-style": ["error", (require("os").platform()?.startsWith("win") ? "windows" : "unix")],
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'simple-import-sort/imports': [
      'error',
      {
        // see https://dev.to/julioxavierr/sorting-your-imports-with-eslint-3ped
        groups: [
          // Packages `nestjs` related packages come first.
          ['^@nestjs', '^@?\\w'],
          // Import modules
          // /!\ fix an circular dependency in `main.js`
          ['^\\./app\\.module$', '\\.module$'],
          // Import services, controllers
          ['.service$', '.controller$', '.repository$'],
          // Import guards, decorators, ...
          [
            '(\\.|/)prox(y|ies)$',
            '(\\.|/)gateway$',
            '(\\.|/)guards?$',
            '(\\.|/)decorator(s?)$',
            '(.|/)strateg(y|ies)$',
          ],
          // Import /models/, /interfaces/, /entities/, /dto/, ...
          [
            '(.|/)entit(y|ies)$',
            '(.|/)model(s?)$',
            '(.|/)dto$',
            '(.|/)interface(s?)$',
            '(.|/)enum(s?)$',
            '(.|/)type(s?)$',
            '(.|/)fake(s?)$',
          ],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ],
      },
    ],
    // "simple-import-sort/exports": "error",
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'filename-rules/match': [2, 'kebabcase'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: '.',
      },
    },
  },
};
