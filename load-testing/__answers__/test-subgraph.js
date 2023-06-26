import http from "k6/http";
import { check } from "k6";

const query = `query Products__subgraph_1__0($representations: [_Any!]!) {
  _entities(representations: $representations) {
    ... on Product {
      id
      name
    }
  }
}
`;

const variables = {
  representations: [
    {
      __typename: "Product",
      id: "123",
    },
    {
      __typename: "Product",
      id: "456",
    },
  ],
};

const headers = {
  "Content-Type": "application/json",
  "apollo-federation-include-trace": "ftv1",
};

export default function () {
  const res = http.post(
    "http://localhost:4001/",
    JSON.stringify({
      query: query,
      variables: variables,
    }),
    {
      headers: headers,
    }
  );

  check(res, {
    "is status 200": (r) => r.status === 200,
  });

  const body = JSON.parse(res.body);
  check(body, {
    "without errors": (b) => b.errors == null,
  });
}
