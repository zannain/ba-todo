"use client";

import React from "react";
import { useTodos } from "../context/TodoContext";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { CreateTodoInput, createTodoSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextControl } from "./TextControl";

const TodoForm: React.FC = () => {
  const { addTodo } = useTodos();
  const [open, setOpen] = React.useState(false);
  const form = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async ({
    title,
    description,
  }: CreateTodoInput): Promise<void> => {
    if (!title.trim()) return;

    await addTodo({ title, description });

    // Close the dialog after submission
    setOpen(false);

    // Reset the form
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <TextControl
                form={form}
                name="title"
                label="Title"
                placeholder="What do you need to do?"
              />
              <TextControl
                form={form}
                name="description"
                label="Description"
                placeholder="Add some notes here"
                inputType="textarea"
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoForm;
