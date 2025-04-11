module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'npm',
      args: 'start',
      instances: 1, // ← Only 1 instance
      exec_mode: 'fork', // ← Not cluster
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
};
