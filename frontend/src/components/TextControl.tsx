"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface FormFieldWrapperProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: keyof T & string;
  label: string;
  placeholder: string;
  inputType?: "input" | "textarea";
}

export function TextControl<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  inputType = "input",
}: FormFieldWrapperProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {inputType === "input" ? (
              <Input placeholder={placeholder} {...field} />
            ) : (
              <Textarea placeholder={placeholder} {...field} />
            )}
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}