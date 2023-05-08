import client from '../config/connection';
import { MongoClient, Db, ObjectId } from 'mongodb';

interface UserSeed {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  zipCode: string;
  email: string;
  password: string;
  emailConfirmed: boolean;
}

const userSeeds: UserSeed[] = [
  {
    "_id": new ObjectId ("61a060a56c009a65fc19f44a"),
    "firstName": "Larry",
    "lastName": "David",
    "zipCode": "80220",
    "email": "larry@david.com",
    "password": "PrettyGood!",
    "emailConfirmed": true
  },
  {
    "_id": new ObjectId ("61a060a56c009a65fc19f44b"),
    "firstName": "Jerry",
    "lastName": "Seinfeld",
    "zipCode": "64804",
    "email": "jerry@seinfeld.com",
    "password": "Password123!",
    "emailConfirmed": true
  },
  {
    "_id": new ObjectId ("61a060a56c009a65fc19f44c"),
    "firstName": "Cosmo",
    "lastName": "Kramer",
    "zipCode": "10007",
    "email": "assman@mail.com",
    "password": "Password123!",
    "emailConfirmed": true
  }
]

async function seedUserData(client: MongoClient) {
  try {
    const db = client.db()
    const usersCollection = db.collection('users');

    await usersCollection.deleteMany({});

    for (const user of userSeeds) {
      await usersCollection.insertOne(user);
    }

    console.log('User Data Seeded');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('all done!');
  process.exit(0);
}

async function main(client: MongoClient) {
  try {
    await client.connect()
    await seedUserData(client);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

main(client);
