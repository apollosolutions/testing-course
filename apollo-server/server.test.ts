import { createApolloServer } from "./server";

test("list products", async () => {
  const server = await createApolloServer();

  const res = await server.executeOperation({
    query: `{ products { id name } }`,
    variables: {},
  });

  expect(res.body).toMatchInlineSnapshot(`
{
  "kind": "single",
  "singleResult": {
    "data": {
      "products": [
        {
          "id": "1",
          "name": "Product 1",
        },
      ],
    },
    "errors": undefined,
  },
}
`);
});

test("product entity resolver", async () => {
  const server = await createApolloServer();

  const res = await server.executeOperation({
    query: `query TODO { __typename }`,
    variables: {
      TODO: "entity representations go here",
    },
  });

  expect(res.body).toMatchInlineSnapshot(`
{
  "kind": "single",
  "singleResult": {
    "data": {
      "_entities": [
        {
          "__typename": "Product",
          "id": "1",
          "name": "Product 1",
        },
      ],
    },
    "errors": undefined,
  },
}
`);
});
