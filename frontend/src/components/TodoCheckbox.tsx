"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useTodos } from "../app/context/TodoContext";
import { Todo } from "../app/types";
import React from "react";

interface TodoCheckboxProps {
  todo: Todo;
}

export function TodoCheckbox({ todo }: TodoCheckboxProps) {
  const { toggleTodoCompletion } = useTodos();

  const handleCheckboxChange = () => {
    toggleTodoCompletion(todo._id, todo.completed || false);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`todo-${todo._id}`}
        checked={todo.completed || false}
        onCheckedChange={handleCheckboxChange}
      />
    </div>
  );
}