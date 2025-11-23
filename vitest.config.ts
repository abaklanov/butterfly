import { loadEnv } from 'vite';
import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from 'vitest/config';

export default defineConfig(({ mode }) => ({
  fileParallelism: false,
  test: {
    exclude: [...configDefaults.exclude, 'build/**/*'],
    coverage: {
      provider: 'v8',
      exclude: [...coverageConfigDefaults.exclude, 'build/**/*'],
    },
    // mode defines what ".env.{mode}" file to choose if exists
    env: loadEnv(mode, process.cwd(), ''),
  },
}));
