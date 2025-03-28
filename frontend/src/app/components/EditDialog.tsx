"use client";

import React from "react";
import { useTodos } from "../context/TodoContext";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo, UpdateTodoInput } from "../types";
import { updateTodoSchema } from "@/lib/schema";
import { TextControl } from "./TextControl";

interface EditButtonProps {
  todo: Todo;
}

export function EditDialog({ todo }: EditButtonProps) {
  const { updateTodo } = useTodos();
  const [open, setOpen] = React.useState(false);

  const form = useForm<UpdateTodoInput>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description || "",
    },
  });

  const onSubmit = async ({
    title,
    description,
  }: UpdateTodoInput): Promise<void> => {
    if (!title?.trim()) return;

    await updateTodo(todo._id, { title, description });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
            <TextControl
                form={form}
                name="title"
                label="Title"
                placeholder="Enter task"
              />
              <TextControl
                form={form}
                name="description"
                label="Description"
                inputType="textarea"
                placeholder="Enter Description"
              />
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
