
import mongoose from 'mongoose';
import app from './app.js';
import seedSuperAdmin from './app/DB/index.js';
import config from './app/config/index.js';

let server;

async function main() {
  try {
    await mongoose.connect(config.database_url);

    seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
