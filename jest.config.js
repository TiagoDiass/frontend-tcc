module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
};
