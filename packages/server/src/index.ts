import "reflect-metadata";
import { ApolloServer } from "apollo-server-koa";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import Koa from "koa";
import { PORT, useMock } from "./utils/constants";
import { getSchema } from "./graphql";
import { startMongoDB } from "./mongo";
import "dotenv/config";

// TODO: login
// TODO: router

async function applyApolloServer(app: Koa) {
  const server = new ApolloServer({
    mocks: useMock(),
    schema: getSchema(),
    context: ({ ctx }) => ctx,
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
}

async function startServer() {
  const port = process.env.PORT;
  const app = new Koa();

  await startMongoDB();
  await applyApolloServer(app);

  app.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );
}

startServer();
