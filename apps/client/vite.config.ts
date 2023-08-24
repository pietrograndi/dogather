import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, "../shared/");

  return defineConfig({
    plugins: [react()],
    define: {
      ...env,
    },
    server: {
      port: Number(env.VITE_PORT),
    },
  });
};
