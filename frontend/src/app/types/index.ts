export interface Todo {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
  }

  // Context types
  export interface TodoContextState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    fetchTodos: () => Promise<void>;
    addTodo: (todoData: AddTodoInput) => Promise<Todo | null>;
    updateTodo: (id: string, todoData: UpdateTodoInput) => Promise<Todo | null>;
    deleteTodo: (id: string) => Promise<boolean>;
    toggleTodoCompletion: (id: string, currentStatus: boolean) => Promise<Todo | null>;
  }

  // API input types
  export interface AddTodoInput {
    title: string;
    description?: string;
  }

  export interface UpdateTodoInput {
    title?: string;
    description?: string;
    completed?: boolean;
  }