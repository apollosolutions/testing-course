import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { parse } from "graphql";
import { readFile } from "node:fs/promises";
import { ProductsDataSource } from "./datasources";

interface Context {
  dataSources: {
    products: ProductsDataSource;
  };
}

export async function createApolloServer() {
  const typeDefs = parse(await readFile("./schema.graphql", "utf8"));
  const resolvers = {
    Query: {
      async products() {
        return { id: "1", name: "Product 1", price: "100" };
      },
    },
    Product: {
      __resolveReference({ id }) {
        return { id, name: `Product ${id}`, price: "100" };
      },
    },
  };
  const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);
  return new ApolloServer<Context>({ schema });
}

export async function context(): Promise<Context> {
  return {
    dataSources: {
      products: new ProductsDataSource(),
    },
  };
}
