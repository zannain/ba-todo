import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController';

// Define route schemas for request validation
const getTodoByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

const createTodoSchema = {
  body: {
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' }
    }
  }
};

const updateTodoSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      completed: { type: 'boolean' }
    }
  }
};

const deleteTodoSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

const todoRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void
): void => {
  // Get all todos
  fastify.get('/api/todos', getTodos);

  // Get single todo by ID
  fastify.get('/api/todos/:id', { schema: getTodoByIdSchema }, getTodoById);

  // Create new todo
  fastify.post('/api/todos', { schema: createTodoSchema }, createTodo);

  // Update todo
  fastify.put('/api/todos/:id', { schema: updateTodoSchema }, updateTodo);

  // Delete todo
  fastify.delete('/api/todos/:id', { schema: deleteTodoSchema }, deleteTodo);

  done();
};

export default todoRoutes;