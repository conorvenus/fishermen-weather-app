import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: [],
//       manifest: {
//         name: 'Fishermen Weather App',
//         short_name: 'FishermenWeather',
//         description: 'Weather App for fishermen',
//         theme_color: '#ffffff',
//         start_url: '/',
//         display: 'standalone',
//         background_color: '#ffffff',
//       },
//     }),
//   ],
// });