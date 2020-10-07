const env = process.env.NODE_ENV || 'development';

if (env) {
  require('dotenv').config({ path: process.cwd() + '/.env' });
}

const app = require('../app');
const http = require('http');
const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('This server running on port:', port);
});

// handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  // close server & exit process
  server.close(() => process.exit(1));
});
