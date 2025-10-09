import { defineConfig } from 'orval';

const defaultTarget =
  process.env.ORVAL_OPENAPI_URL ?? 'http://localhost:8080/swagger/v1/swagger.json';

export default defineConfig({
  navigatorApi: {
    input: {
      target: defaultTarget,
    },
    output: {
      mode: 'single',
      target: 'src/lib/api/generated.ts',
      schemas: 'src/lib/api/model',
      client: 'fetch',
      clean: true,
    },
  },
});
