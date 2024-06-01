module.exports = {
    apps : [{
      name: "app",
      script: "./src/app/index.js",
      instances: 1,
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }