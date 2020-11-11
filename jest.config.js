module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testMatch: ['**/__tests__/**/*test.(ts|tsx)'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|es|lib)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  watchPathIgnorePatterns: ['.*/generated/'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__tests__/__mocks__/fileMock.js',
  },
  modulePaths: ['<rootDir>', '<rootDir>/src/'],
  testURL: 'http://localhost:3000',
  preset: 'ts-jest/presets/js-with-babel',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx,d.ts,d.tsx}',
    '!**/node_modules/**',
    '!**/es/**',
    '!**/lib/**',
    '!**/coverage/**',
    '!**/storybook-static/**',
    '!**/generated/**',
  ],
}
