import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Bundle Font Awesome into the server build used for prerendering (avoids CJS/ESM named-import issues in Node).
  ssr: { noExternal: [/^@fortawesome\//] },
});
