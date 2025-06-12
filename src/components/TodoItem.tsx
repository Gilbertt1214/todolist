import React, { useState } from "react";
import { Todo } from "../types";
import {
    CheckCircle2,
    Circle,
    Pencil,
    Trash2,
    X,
    Save,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onStartEdit: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Todo>) => void;
    isEditing: boolean;
    onCancelEdit: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    onToggle,
    onDelete,
    onStartEdit,
    onUpdate,
    isEditing,
    onCancelEdit,
}) => {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description || "");
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onUpdate(todo.id, {
                title: title.trim(),
                description: description.trim() || undefined,
            });
        }
    };

    if (isEditing) {
        return (
            <form
                onSubmit={handleUpdate}
                className="p-5 mb-3 bg-white rounded-xl shadow-xl border-2 border-indigo-100 animate-popIn"
            >
                <div className="mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                        autoFocus
                    />
                </div>
                <div className="mb-5">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent min-h-[100px] resize-none transition-all duration-300"
                    ></textarea>
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 font-medium"
                    >
                        <X size={18} /> Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!title.trim()}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-300 ${
                            title.trim()
                                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 shadow-md hover:shadow-lg"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </form>
        );
    }

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`p-5 mb-3 rounded-xl transition-all duration-300 ${
                todo.completed
                    ? "bg-emerald-50 border-l-4 border-emerald-400"
                    : "bg-white shadow-md hover:shadow-lg"
            } ${isHovered ? "transform hover:-translate-y-0.5" : ""}`}
        >
            <div className="flex items-start gap-3">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`mt-0.5 transition-all duration-300 ${
                        todo.completed
                            ? "text-emerald-500 hover:text-emerald-600"
                            : "text-gray-300 hover:text-indigo-500"
                    }`}
                    aria-label={
                        todo.completed
                            ? "Mark as incomplete"
                            : "Mark as complete"
                    }
                >
                    {todo.completed ? (
                        <CheckCircle2 size={24} className="animate-popIn" />
                    ) : (
                        <Circle size={24} />
                    )}
                </button>

                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3
                            className={`text-lg font-medium transition-all duration-300 ${
                                todo.completed
                                    ? "text-gray-500 line-through"
                                    : "text-gray-800"
                            }`}
                        >
                            {todo.title}
                        </h3>

                        <div
                            className={`flex gap-2 transition-opacity duration-300 ${
                                isHovered ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <button
                                onClick={() => onStartEdit(todo.id)}
                                className="p-2 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300"
                                aria-label="Edit todo"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={() => onDelete(todo.id)}
                                className="p-2 text-gray-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-all duration-300"
                                aria-label="Delete todo"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    {todo.description && (
                        <>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-2 flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-all duration-300"
                            >
                                {isExpanded ? (
                                    <>
                                        <ChevronUp size={16} className="mr-1" />{" "}
                                        Hide details
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown
                                            size={16}
                                            className="mr-1"
                                        />{" "}
                                        Show details
                                    </>
                                )}
                            </button>

                            {isExpanded && (
                                <div className="mt-2 pl-1 animate-fadeIn">
                                    <p
                                        className={`text-gray-600 text-sm border-l-2 border-gray-200 pl-3 py-1 ${
                                            todo.completed ? "line-through" : ""
                                        }`}
                                    >
                                        {todo.description}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
