module.exports = {
    apps: [
      {
        name: `frontend`,
        script: "npx",
        args: "vite preview",
        env: {
          PORT: 5173,
          NODE_ENV: 'production',
        },
      },
      {
        name: `backend`,
        script: "node",
        args: "server/dist/server.js",
        env: {
          PORT: 3001,
          NODE_ENV: 'production',
        },
        watch: false,
        autorestart: true,
        max_memory_restart: '1G',
        instances: 1,
        exec_mode: 'cluster',
        env_production: {
          PORT: 3001,
          NODE_ENV: 'production',
        },
      }
    ],
  };
  