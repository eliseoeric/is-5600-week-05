# Lab 05 — Fullstack Prints Part 2

## Run in GitHub Codespaces

Open this repository in Codespaces using the included devcontainer. It starts a MongoDB service with the instructor-provided local demo credentials.

```sh
npm install
npm run import
npm start
```

Open forwarded port 3000. The existing frontend remains unchanged. The import command preserves source IDs and skips records already imported.

For a different MongoDB service, set `MONGODB_URI` in your terminal before running these commands. The default is `mongodb://root:example@localhost:27017/products-db?authSource=admin`. Do not commit a connection string containing private credentials. No Atlas account is needed for the provided Codespaces database.

## API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | /products | List; optional offset, limit, tag |
| POST | /products | Create a product |
| GET | /products/:id | Retrieve a product |
| PUT | /products/:id | Edit a product |
| DELETE | /products/:id | Delete a product |
| GET | /orders | List; optional offset, limit, productId, status |
| POST | /orders | Create an order |
| GET | /orders/:id | Retrieve an order with populated products |
| PUT | /orders/:id | Edit an order |
| DELETE | /orders/:id | Delete an order |

Send JSON request bodies with `Content-Type: application/json`. Creation returns 201. Deleting a product returns the deletion result; deleting an order returns 204. Missing records return 404, invalid input returns 400, and duplicate IDs return 409. Pagination defaults to offset 0 and limit 25; limit 0 returns an empty array. Product IDs are strings. Order status is CREATED, PENDING, or COMPLETED.

The README's order-creation example uses GET by mistake; this implementation uses POST. Database connection completes before the HTTP server starts. The Products and Orders modules implement the specified list, get, create, edit, and destroy functions. Orders.destroy resolves without a return value.

## Verification

```sh
npm test
```

The four integration tests use an isolated real MongoDB process managed by mongodb-memory-server, not the Codespaces database. The first run may download a MongoDB binary and requires internet access. Tests cover CRUD, populated references, filtering, pagination, validation, missing records, duplicate IDs, malformed JSON, reconnect persistence, and importing all 346 products twice without duplication.

Import `Lab05.postman_collection.json` into Postman and run its requests in order. Set `baseUrl` to your forwarded Codespaces URL if necessary. The collection saves created IDs for subsequent requests and removes its test records.

## Submission

Commit the changes to your fork, create a pull request to the instructor's repository, and submit that pull request URL in Canvas. This package does not submit the assignment for you.
