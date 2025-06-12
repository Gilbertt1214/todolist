import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

interface TodoFormProps {
    onAdd: (title: string, description?: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [expanded, setExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title, description.trim() || undefined);
            setTitle("");
            setDescription("");
            if (!description) {
                setExpanded(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div
                className={`bg-white p-5 rounded-xl shadow-lg transition-all duration-300 ${
                    expanded ? "ring-2 ring-indigo-100" : ""
                }`}
            >
                <div className="relative">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                        className="w-full px-4 py-3 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                        onFocus={() => setExpanded(true)}
                    />
                    {!expanded && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <PlusCircle className="w-5 h-5 text-gray-400" />
                        </div>
                    )}
                </div>

                {expanded && (
                    <div className="mt-4 animate-fadeIn">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add description (optional)"
                            className="w-full px-4 py-3 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none min-h-[100px] transition-all duration-300 placeholder-gray-400"
                        ></textarea>

                        <div className="flex justify-between items-center mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    if (!title && !description) {
                                        setExpanded(false);
                                    } else {
                                        if (confirm("Discard this task?")) {
                                            setTitle("");
                                            setDescription("");
                                            setExpanded(false);
                                        }
                                    }
                                }}
                                className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-lg transition-all duration-300 hover:bg-gray-100"
                            >
                                Discard
                            </button>

                            <button
                                type="submit"
                                disabled={!title.trim()}
                                className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-all duration-300 ${
                                    title.trim()
                                        ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                <PlusCircle
                                    size={18}
                                    className={`transition-transform ${
                                        title.trim()
                                            ? "group-hover:rotate-90"
                                            : ""
                                    }`}
                                />
                                Add Task
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
};
