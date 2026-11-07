import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/int/**/*.int.spec.ts'],
    // Specs that boot Payload each start a workerd instance against the same
    // local D1 file; running files in parallel deadlocks on SQLITE_BUSY.
    fileParallelism: false,
  },
})
