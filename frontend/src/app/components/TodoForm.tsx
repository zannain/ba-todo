'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useTodos } from '../context/TodoContext';

const TodoForm: React.FC = () => {
  const { addTodo, loading } = useTodos();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!title.trim()) return;

    await addTodo({ title, description });
    setTitle('');
    setDescription('');
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;