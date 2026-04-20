import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  base: '/ContactBook/',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [react() as any],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@config": path.resolve(__dirname, "src/config"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@t": path.resolve(__dirname, "src/types"),
      "@store": path.resolve(__dirname, "src/store"),
      "@contexts": path.resolve(__dirname, "src/context"),
      "@utils": path.resolve(__dirname, "src/utils")
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  },
});