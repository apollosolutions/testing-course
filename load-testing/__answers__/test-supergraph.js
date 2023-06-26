import http from "k6/http";
import { check } from "k6";

const query = `{ products { id name } }`;
const hash = "1aef90a3820cfd5b9a095c647242e456e44cb7f24d66663425d9683ed86d0a72";

const variables = {};

const extensions = {
  persistedQuery: {
    version: 1,
    sha256Hash: hash,
  },
};

const headers = {
  "Content-Type": "application/json",
};

export function setup() {
  http.post(
    "http://localhost:4000/",
    JSON.stringify({
      query: query,
      variables: variables,
      extensions: extensions,
    }),
    { headers: headers }
  );
}

export default function () {
  const res = http.post(
    "http://localhost:4000/",
    JSON.stringify({
      variables: variables,
      extensions: extensions,
    }),
    { headers: headers }
  );

  check(res, {
    "is status 200": (r) => r.status === 200,
  });

  const body = JSON.parse(res.body);
  check(body, {
    "without errors": (b) => b.errors == null,
  });
}
