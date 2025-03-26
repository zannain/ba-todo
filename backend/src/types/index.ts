import { FastifyRequest } from 'fastify';
import { Document } from 'mongoose';

// Todo Interface
export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

// Request interfaces
export interface GetTodoParams {
  id: string;
}

export interface CreateTodoBody {
  title: string;
  description?: string;
}

export interface UpdateTodoBody {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Request type definitions
export type GetTodoRequest = FastifyRequest<{
  Params: GetTodoParams;
}>;

export type CreateTodoRequest = FastifyRequest<{
  Body: CreateTodoBody;
}>;

export type UpdateTodoRequest = FastifyRequest<{
  Params: GetTodoParams;
  Body: UpdateTodoBody;
}>;

export type DeleteTodoRequest = FastifyRequest<{
  Params: GetTodoParams;
}>;