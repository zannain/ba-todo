import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <TodoForm />
      <TodoList />
    </main>
  );
}