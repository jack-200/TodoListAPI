# Todo List API

This is a simple Todo List API built with Node.js and Express.

## Setup

1. Initialize Node.js project: `npm init -y`
2. Install dependencies: `npm install`
3. Start the server: `node server.js`

## API Endpoints

- `GET /`: The title page of the application.
- `POST /todos`: Create a new todo item. Send a JSON body with `title` property.
- `GET /todos`: Get all todo items. If the `Accept` header is set to `application/json`, it returns a JSON response. Otherwise, it returns an HTML response with a table of todo items.
- `PUT /todos/:id`: Update a todo item with the given ID. Send a JSON body with the properties you want to update.
- `DELETE /todos/:id`: Delete a todo item with the given ID.

## Example API requests

### Create new todo items (CMD)

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"Book doctor's appointment\"}" http://localhost:3000/todos
curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"Buy groceries\"}" http://localhost:3000/todos
curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"Call parents\"}" http://localhost:3000/todos
curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"Finish project report\"}" http://localhost:3000/todos
curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"Plan weekend getaway\"}" http://localhost:3000/todos
curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"Study for exam\"}" http://localhost:3000/todos
```

### Get all todo items

```bash
curl -H "Accept: application/json" http://localhost:3000/todos
```

### Update a todo item

```bash
curl -X PUT -H "Content-Type: application/json" -d "{\"title\":\"changed title\",\"completed\":true}" http://localhost:3000/todos/1
```

### Delete a todo item

```bash
curl -X DELETE http://localhost:3000/todos/1
```
