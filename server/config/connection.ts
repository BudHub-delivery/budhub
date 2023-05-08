// import mongoose, { ConnectOptions } from "mongoose";

// const options: ConnectOptions = {
//   serverSelectionTimeoutMS: 5000, 
// };
// mongoose.set('debug', true);
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/BudHub', options);

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to MongoDB!");
// });

// export default db;

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/BudHub';
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 50000,
});

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    const db = client.db();
    // Use the db object for your database operations

    // Make sure to close the connection when your application exits
    process.on('SIGINT', async () => {
      await client.close();
      console.log('Disconnected from MongoDB');
      process.exit(0);
    });

  } catch (error) {
    console.error('connection error:', error);
  }
}

connect();

export default client;
