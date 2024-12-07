module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:readable-tailwind/error',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['coverage', 'dist', 'commitlint.config.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './tsconfig.app.json',
      './tsconfig.node.json',
      './cypress/tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react-refresh',
    'import',
    'unused-imports',
    'simple-import-sort',
    'prettier',
    'tailwindcss',
    'readable-tailwind',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-cycle': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'error',
    'readable-tailwind/multiline': ['error', { group: 'newLine' }],
    'readable-tailwind/sort-classes': 'off',
    'prefer-const': 'error',
    'prettier/prettier': 'error',
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/no-custom-classname': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: 'tailwind.config.ts',
    },
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // `react` comes first, other node_modules after that.
              ['^react', '^@?\\w'],
              // Absolute imports.
              ['^@/'],
              // Relative imports, Put same-folder imports first and Parent imports last.
              [
                '^\\u0000',
                '^\\./(?=.*/)(?!/?$)',
                '^\\.(?!/?$)',
                '^\\./?$',
                '^\\.\\.(?!/?$)',
                '^\\.\\./?$',
              ],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
}
