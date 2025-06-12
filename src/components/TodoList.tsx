import React from 'react';
import { TodoItem } from './TodoItem';
import { TodoFilters } from './TodoFilters';
import { Todo, TodoStatus } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  editingId: string | null;
  onCancelEdit: () => void;
  filter: TodoStatus;
  onFilterChange: (filter: TodoStatus) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onStartEdit,
  onUpdate,
  editingId,
  onCancelEdit,
  filter,
  onFilterChange,
}) => {
  const todoCount = {
    total: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  return (
    <div>
      <TodoFilters
        activeFilter={filter}
        onFilterChange={onFilterChange}
        todoCount={todoCount}
      />

      {todos.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No tasks found.</p>
          <p className="text-gray-400 text-sm mt-1">
            {filter !== 'all'
              ? `Try changing the filter or add a new task.`
              : `Add a task to get started!`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onStartEdit={onStartEdit}
              onUpdate={onUpdate}
              isEditing={editingId === todo.id}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};