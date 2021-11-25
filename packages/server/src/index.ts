import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import Koa from "koa";
import { PORT, useMock } from "./utils/constants";
import { getSchema } from "./graphql";

// TODO: login
// TODO: mongodb
// TODO: router

async function applyApolloServer(app: Koa) {
  const server = new ApolloServer({ mocks: useMock(), schema: getSchema() });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
}

async function startServer() {
  const app = new Koa();

  await applyApolloServer(app);

  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
  );
}

startServer();
