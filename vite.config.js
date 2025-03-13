import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/ProjectLLM-FrontEnd/', // Replace <REPO_NAME> with your repository name
  build: {
    outDir: 'dist'
  },
  plugins: [react()],
})

