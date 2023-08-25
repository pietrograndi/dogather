import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const keyList = ['VITE_PORT','WS_PORT','WS_BASE_URL']

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, "../shared/", '');
  return defineConfig({
    plugins: [react()],
    define: {
      // 'process.env.VITE_PORT':JSON.stringify(env.VITE_PORT),
      // 'process.env.WS_PORT':JSON.stringify(env.WS_PORT),
      // 'process.env.WS_BASE_URL':JSON.stringify(env.WS_BASE_URL),
      ...keyList.reduce((acc, key ) => {
        return {
          ...acc,
          [`process.env.${key}`]: JSON.stringify(env[key])
        }
      },{})
    },
    server: {
      port: Number(env.VITE_PORT),
    },
  });
};
