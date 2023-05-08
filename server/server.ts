import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express'
import path from 'path'
import typeDefs from './schemas/typeDefs'
import resolvers from './schemas/resolvers'
import { authMiddleware } from './utils/auth';
import client from './config/connection';


const app = express();
const PORT = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers: [resolvers],
  context: authMiddleware,
});

async function startApolloServer() {
  await server.start();

  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`)
      else
        next()
    })
  }

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  client.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer();