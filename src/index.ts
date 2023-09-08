import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

async function startApolloServer() {
  const app = express();

  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'Hello, GraphQL World!',
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🌐 http://localhost:${PORT}/graphql`);
  });
}

startApolloServer().catch((error) => {
  console.error('Error:', error);
});
