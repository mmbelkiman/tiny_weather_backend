import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import dotenv from 'dotenv';
import { loggingMiddleware } from '@/middleware/loggingMiddleware';

async function startApolloServer() {
  dotenv.config();

  const app = express();

  const PORT = process.env.PORT || 4000;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      {
        async requestDidStart(requestContext) {
          await loggingMiddleware(requestContext);
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`🌐 http://localhost:${PORT}/graphql`);
  });
}

startApolloServer().catch((error) => {
  console.error('Error:', error);
});
