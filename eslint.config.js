import { defineConfig } from 'eslint/config'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'

export default defineConfig({
  files: ['**/*.{js,mjs,jsx,vue}'],
  ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  languageOptions: {
    globals: {
      ...globals.browser,
    },
  },
  rules: {
    'vue/no-v-html': 'off',
  },
  plugins: {
    vue: pluginVue,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
  ],
})


