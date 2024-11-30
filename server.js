// import { createServer } from "node:http";

// const server = createServer((request, response) => {
//   response.write("pi");
//   return response.end();
// });

// server.listen(3000);

import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const database = new DatabaseMemory();

const server = fastify();

// server.get("/", () => {
//   return "Ola mundo";
// });

// server.get("/hello", () => {
//   return "hello";
// });

// server.get("/node", () => {
//   return "Ola node";
// });

//CRUD

// Request body

server.post("/videos", (request, reply) => {
  const { title, description, duration } = request.body;
  database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", (request, reply) => {
  const videos = database.list();

  return videos;
});

server.put("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  database.update(videoId, {
    title,
    description,
    duration,
  });
  return reply.status(204);
});

server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return reply.status(204).send();
});

// Inicializando server

server.listen({
  port: 3333,
});
