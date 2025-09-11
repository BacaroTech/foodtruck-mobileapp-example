import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/bacarotruck/delete/',
  build: {
    outDir: path.resolve(__dirname, '../deploy'), 
  },
});