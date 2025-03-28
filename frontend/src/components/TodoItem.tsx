"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { EditDialog } from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { TodoCheckbox } from "./TodoCheckbox";
import { Badge } from "./ui/badge";
import { Todo } from "../app/types"; // Make sure to adjust this import based on your actual Todo type location

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <TableRow>
      <TableCell className="flex gap-2">
        <TodoCheckbox todo={todo} />
        {todo.title}
      </TableCell>
      <TableCell>{todo.description}</TableCell>
      <TableCell className="flex space-x-2">
        {todo.completed ? (
          <Badge variant="success">Completed</Badge>
        ) : (
          <>
            <DeleteDialog todoId={todo._id} />
            <EditDialog todo={todo} />
          </>
        )}
      </TableCell>
    </TableRow>
  );
};