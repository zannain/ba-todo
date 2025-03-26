'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { Todo, TodoContextState, AddTodoInput, UpdateTodoInput } from '../types';

// Create context with a default empty value
const TodoContext = createContext<TodoContextState | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  // Create axios instance
  const api = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // Fetch all todos
  const fetchTodos = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.get<Todo[]>('/api/todos');
      setTodos(response.data);
      setError(null);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.response?.data?.error || error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Add a todo
  const addTodo = async (todoData: AddTodoInput): Promise<Todo | null> => {
    setLoading(true);
    try {
      const response = await api.post<Todo>('/api/todos', todoData);
      setTodos((prevTodos) => [response.data, ...prevTodos]);
      setError(null);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      setError(error.response?.data?.error || error.message || 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a todo
  const updateTodo = async (id: string, todoData: UpdateTodoInput): Promise<Todo | null> => {
    setLoading(true);
    try {
      const response = await api.put<Todo>(`/api/todos/${id}`, todoData);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data : todo))
      );
      setError(null);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      setError(error.response?.data?.error || error.message || 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      await api.delete(`/api/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      setError(null);
      return true;
    } catch (err) {
      const error = err as AxiosError;
      setError(error.response?.data?.error || error.message || 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion status
  const toggleTodoCompletion = async (id: string, currentStatus: boolean): Promise<Todo | null> => {
    return await updateTodo(id, { completed: !currentStatus });
  };

  // Load todos on initial render
  useEffect(() => {
    fetchTodos();
  }, []);

  // Define the value for the context provider
  const contextValue: TodoContextState = {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodoCompletion,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos(): TodoContextState {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}