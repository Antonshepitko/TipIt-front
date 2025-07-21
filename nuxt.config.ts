export default defineNuxtConfig({
  css: ['/assets/css/main.css'],
  app: {
    head: {
      title: 'TipIt',
    },
  },
  vite: {
    plugins: [
      require('vite-tsconfig-paths').default(),
    ],
  },
});
