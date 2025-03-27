import { FastifyReply } from 'fastify';
import Todo from '../models/Todo';
import {
  GetTodoRequest,
  CreateTodoRequest,
  UpdateTodoRequest,
  DeleteTodoRequest
} from '../types';

// Get all todos
export const getTodos = async (request: any, reply: FastifyReply): Promise<void> => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    reply.code(200).send(todos);
  } catch (error) {
    reply.code(500).send({ error: 'Server error' });
  }
};

// Get single todo by ID
export const getTodoById = async (request: GetTodoRequest, reply: FastifyReply): Promise<void> => {
  try {
    const todo = await Todo.findById(request.params.id);

    if (!todo) {
      reply.code(404).send({ error: 'Todo not found' });
      return;
    }

    reply.code(200).send(todo);
  } catch (error) {
    reply.code(500).send({ error: 'Server error' });
  }
};

// Create a new todo
export const createTodo = async (request: CreateTodoRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { title, description } = request.body;
    const todo = new Todo({
      title,
      description
    });

    const savedTodo = await todo.save();
    reply.code(201).send(savedTodo);
  } catch (error) {
    reply.code(500).send({ error: 'Server error' });
  }
};

// Update a todo
export const updateTodo = async (request: UpdateTodoRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { title, description, completed } = request.body;

    const todo = await Todo.findById(request.params.id);

    if (!todo) {
      reply.code(404).send({ error: 'Todo not found' });
      return;
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    const updatedTodo = await todo.save();
    reply.code(200).send(updatedTodo);
  } catch (error) {
    reply.code(500).send({ error: 'Server error' });
  }
};

// Delete a todo
export const deleteTodo = async (request: DeleteTodoRequest, reply: FastifyReply): Promise<void> => {
  try {
    const todo = await Todo.findById(request.params.id);
    if (!todo) {
      reply.code(404).send({ error: 'Todo not found' });
      return;
    }

    await todo.deleteOne();
    reply.code(200).send({ message: 'Todo removed' });
  } catch (error) {
    reply.code(500).send({ error: 'Server error' });
  }
};