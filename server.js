// Create an Express server
const expressModule = require("express");
const bodyParserModule = require("body-parser");

const server = expressModule();
server.use(bodyParserModule.json());

// Title Page @ http://localhost:3000/
server.get("/", (request, response) => {
  response.send(
    '<h1>Welcome to the Todo App</h1><p>Access the API at <a href="/todos">/todos</a></p>'
  );
});

/* Create routes for CRUD operations: Create (Post), Read (Get), Update (Put), Delete (Delete) */

// Create a new todo
let todoItems = [];
server.post("/todos", (request, response) => {
  const TodoItem = {
    id: todoItems.length + 1,
    title: request.body.title,
    completed: false,
  };
  todoItems.push(TodoItem);
  response.status(201).json(TodoItem);
});

// Read all todos @ http://localhost:3000/todos
server.get("/todos", (request, response) => {
  // Check if request is for JSON response only
  if (request.headers.accept === "application/json") {
    return response.json(todoItems);
  }
  // If not raw JSON data, return HTML response of a table
  let html = `<style>
      table {
        border-spacing: 15px;
      }
    </style>
    <h1>Todo List</h1><table><tr><th>ID</th><th>Title</th><th>Completed</th></tr>`;
  todoItems.forEach((todo) => {
    html += `<tr><td>${todo.id}</td><td>${todo.title}</td><td>${todo.completed}</td></tr>`;
  });
  html += "</table>";
  response.send(html);
});

// Function to find a todo by its ID
function findTodoById(id) {
  const index = todoItems.findIndex((item) => item.id === parseInt(id));
  if (index === -1) {
    return { error: { message: `Todo with ID ${id} not found` } };
  }
  return { index };
}

// Update a todo
server.put("/todos/:id", (request, response) => {
  const { error, index: todoIndex } = findTodoById(request.params.id);
  if (error) {
    return response.status(404).json(error);
  }
  Object.assign(todoItems[todoIndex], request.body);
  response.json(todoItems[todoIndex]);
});

// Delete a todo
server.delete("/todos/:id", (request, response) => {
  const { error, index: todoIndex } = findTodoById(request.params.id);
  if (error) {
    return response.status(404).json(error);
  }
  todoItems.splice(todoIndex, 1);
  for (let i = todoIndex; i < todoItems.length; i++) {
    todoItems[i].id = i + 1; // Fill the gap in IDs
  }
  response.status(204).end();
});

// Start the server on port 3000 and log a message
const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () =>
  console.log(`Server running on port ${serverPort}`)
);
