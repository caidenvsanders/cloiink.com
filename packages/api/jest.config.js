const TS_CONFIG_PATH = '<rootDir>/tsconfig.jest.json';
const SRC_PATH = '<rootDir>/src';

module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: TS_CONFIG_PATH,
    },
  },

  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', SRC_PATH],
  roots: [SRC_PATH],
};
