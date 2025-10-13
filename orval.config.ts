import { defineConfig } from 'orval';

const defaultTarget =
  process.env.ORVAL_OPENAPI_URL ?? 'http://localhost:8080/swagger/v1/swagger.json';
const defaultBaseUrl = process.env.ORVAL_BASE_URL ?? 'http://localhost:8080';

export default defineConfig({
  navigatorApi: {
    input: {
      target: defaultTarget,
    },
    output: {
      mode: 'single',
      target: 'src/lib/api/generated.ts',
      schemas: 'src/lib/api/model',
      baseUrl: defaultBaseUrl,
      client: 'fetch',
      clean: true,
      override: {
        fetcher: {
          path: 'src/lib/api/fetcher.ts',
          name: 'apiFetch',
        },
      },
    },
  },
});
