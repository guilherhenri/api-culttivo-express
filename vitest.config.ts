import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    globalSetup: './test/global-setup.ts',
    exclude: ['node_modules', 'test'],
    include: [
      'src',
      './**/*spec.ts',
    ],
  },
})