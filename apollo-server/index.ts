import { startStandaloneServer } from "@apollo/server/standalone";
import { createApolloServer, context } from "./server";

const { url } = await startStandaloneServer(await createApolloServer(), {
  listen: { port: 4000 },
  context,
});
console.log(`🚀 Server ready at ${url}`);
