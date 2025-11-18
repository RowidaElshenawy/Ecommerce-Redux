import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@assets":path.resolve(__dirname,"./src/assets"),
      "@components":path.resolve(__dirname,"./src/components"),
      "@hooks":path.resolve(__dirname,"./src/hooks"),
      "@routes":path.resolve(__dirname,"./src/routes"),
      "@redux":path.resolve(__dirname,"./src/redux"),
      "@styles":path.resolve(__dirname,"./src/styles"),
      "@layouts":path.resolve(__dirname,"./src/layouts"),
      "@utils":path.resolve(__dirname,"./src/utils"),
      "@services":path.resolve(__dirname,"./src/services"),
      "@pages":path.resolve(__dirname,"./src/pages"),
      "@types":path.resolve(__dirname,"./src/types"),
    }
  },
  plugins: [react(), svgr()],
})
