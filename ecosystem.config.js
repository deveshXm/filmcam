export default {
  apps: [
    {
      name: "frontend",
      script: "npx",
      args: "serve -s dist -l 5173",
      cwd: "./",
      env: {
        PORT: 5173,
        NODE_ENV: "production"
      }
    },
    {
      name: "backend",
      script: "server/dist/server.js",
      cwd: "./",
      env: {
        PORT: 3001,
        NODE_ENV: "production"
      },
      watch: false,
      autorestart: true,
      max_memory_restart: "1G"
    }
  ]
};
  