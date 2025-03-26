import React from 'react';
import { TodoProvider } from './context/TodoContext';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A Todo application built with Next.js, Fastify and MongoDB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TodoProvider>
          {children}
        </TodoProvider>
      </body>
    </html>
  );
}