# Load testing

## Setup

1. Install prerequisites
   - [Docker](https://docs.docker.com/get-docker/)
   - [K6](https://k6.io/docs/get-started/installation/)
2. Run the demo supergraph
   ```sh
   docker compose --up build
   ```

## Running a test

Refer to the [K6 documentation on HTTP requests](https://k6.io/docs/using-k6/http-requests/).

> Working scripts are in `__answers__`, but try to write the tests before peeking!

## Looking at results in Grafana

Visit the Grafana UI at [http://localhost:3000/](http://localhost:3000/). The default username is "admin" and the default password is "admin".

## Changing the supergraph

1. Make changes to the subgraph schema in `subgraph-a.graphql`.
2. Update the supergraph schema:
   ```sh
   rover supergraph compose --config supergraph.yaml > supergraph.graphql
   ```
