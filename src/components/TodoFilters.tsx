import React from 'react';
import { TodoStatus } from '../types';

interface TodoFiltersProps {
  activeFilter: TodoStatus;
  onFilterChange: (filter: TodoStatus) => void;
  todoCount: {
    total: number;
    active: number;
    completed: number;
  };
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  activeFilter,
  onFilterChange,
  todoCount,
}) => {
  const filters: { label: string; value: TodoStatus; count: number }[] = [
    { label: 'All', value: 'all', count: todoCount.total },
    { label: 'Active', value: 'active', count: todoCount.active },
    { label: 'Completed', value: 'completed', count: todoCount.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === filter.value
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-indigo-100'
          }`}
        >
          {filter.label} {filter.count > 0 && <span className="ml-1">({filter.count})</span>}
        </button>
      ))}
    </div>
  );
};