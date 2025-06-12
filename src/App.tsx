import { useState } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { useTodos } from "./hooks/useTodos";
import { ClipboardList } from "lucide-react";

function App() {
    const {
        todos,
        filter,
        editingId,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
        setFilter,
        startEditing,
        cancelEditing,
    } = useTodos();

    const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setTodoToDelete(id);
    };

    const confirmDelete = () => {
        if (todoToDelete) {
            deleteTodo(todoToDelete);
            setTodoToDelete(null);
        }
    };

    const cancelDelete = () => {
        setTodoToDelete(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 px-4">
            <div className="max-w-2xl mx-auto animate-fade-in">
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-indigo-100 rounded-full shadow-md transform transition-all duration-500 hover:rotate-6 hover:scale-110">
                            <ClipboardList className="w-8 h-8 text-indigo-600" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                        TodoList App
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Organize your tasks efficiently
                    </p>
                    <div className="mt-4 h-1 w-20 bg-indigo-200 mx-auto rounded-full"></div>
                </header>

                <main className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <div className="p-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

                    <div className="p-6">
                        <TodoForm onAdd={addTodo} />

                        <div className="mt-8">
                            <TodoList
                                todos={todos}
                                onToggle={toggleTodo}
                                onDelete={handleDelete}
                                onStartEdit={startEditing}
                                onUpdate={updateTodo}
                                editingId={editingId}
                                onCancelEdit={cancelEditing}
                                filter={filter}
                                onFilterChange={setFilter}
                            />
                        </div>
                    </div>
                </main>

                <footer className="text-center mt-10">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} TodoList App • Made with ❤️
                    </p>
                </footer>
            </div>

            <ConfirmDialog
                isOpen={todoToDelete !== null}
                message="Are you sure you want to delete this task? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
}

export default App;
