"use client";

import React from "react";
import { useTodos } from "../app/context/TodoContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditDialog } from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { TodoCheckbox } from "./TodoCheckbox";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Description</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo._id}>
              <TableCell className="flex gap-2">
                <TodoCheckbox todo={todo} />
                {todo.title}
                </TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell className="flex space-x-2">
                <DeleteDialog todoId={todo._id}></DeleteDialog>
                <EditDialog todo={todo}></EditDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
