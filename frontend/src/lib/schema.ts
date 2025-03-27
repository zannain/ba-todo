import { z } from "zod";

// Schema for creating a new todo
export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(25, "Title cannot exceed 25 characters"),
  description: z
    .string()
    .max(100, "Description cannot exceed 100 characters")
    .optional(),
});

// Schema for updating a todo
export const updateTodoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(25, "Title cannot exceed 25 characters")
    .optional(),
  description: z
    .string()
    .max(100, "Description cannot exceed 100 characters")
    .optional(),
  completed: z.boolean().optional(),
});

// Infer types from schemas
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;