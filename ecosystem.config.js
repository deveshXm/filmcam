export default {
  apps: [
    {
      name: "frontend",
      script: "vite",
      args: "preview --port 5173",
      env: {
        PORT: 5173,
        NODE_ENV: "production"
      }
    },
    // {
    //   name: "backend",
    //   script: "server/dist/server.js",
    //   env: {
    //     PORT: 3001,
    //     NODE_ENV: "production"
    //   },
    //   watch: false,
    //   autorestart: true,
    //   max_memory_restart: "1G"
    // }
  ]
};
  