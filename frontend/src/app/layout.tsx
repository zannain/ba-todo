import React from 'react';
import { TodoProvider } from './context/TodoContext';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Blue Agilis To-dos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <TodoProvider>
          {children}
        </TodoProvider>
      </body>
    </html>
  );
}