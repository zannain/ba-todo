'use client';

import React, { useState, ChangeEvent } from 'react';
import { useTodos } from '../app/context/TodoContext';
import { Todo } from '../app/types';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodoCompletion, updateTodo, deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const [editDescription, setEditDescription] = useState<string>(todo.description || '');

  const handleToggleComplete = (): void => {
    toggleTodoCompletion(todo._id, todo.completed);
  };

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleUpdate = async (): Promise<void> => {
    if (!editTitle.trim()) return;

    await updateTodo(todo._id, {
      title: editTitle,
      description: editDescription,
    });

    setIsEditing(false);
  };

  const handleCancel = (): void => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleDelete = (): void => {
      deleteTodo(todo._id);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setEditDescription(e.target.value);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`p-4 mb-4 border rounded shadow-sm ${todo.completed ? 'bg-green-50' : 'bg-white'}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={handleTitleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editDescription}
            onChange={handleDescriptionChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggleComplete}
                className="w-4 h-4 mr-2"
              />
              <h3
                className={`text-lg font-semibold ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.title}
              </h3>
            </div>
            <div className="text-sm text-gray-500">
              {formatDate(todo.createdAt)}
            </div>
          </div>

          {todo.description && (
            <p className={`mb-3 ${todo.completed ? 'text-gray-500' : ''}`}>
              {todo.description}
            </p>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;