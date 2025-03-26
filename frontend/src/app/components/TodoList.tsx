'use client';

import React from 'react';
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todos, loading, error } = useTodos();

  if (loading && todos.length === 0) {
    return <div className="text-center py-4">Loading todos...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 border border-red-200 rounded">
        Error: {error}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No todos yet. Add a new one to get started!
      </div>
    );
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;