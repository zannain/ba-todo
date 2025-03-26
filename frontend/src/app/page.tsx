import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function Home() {
  return (
    <main className="container max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
      <TodoForm />
      <TodoList />
    </main>
  );
}