import { useState, useEffect } from 'react';
import Todos from './components/Todos';
import Modal from './components/Modal';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState(''); // For editing
  const [newTodoValue, setNewTodoValue] = useState(''); // For adding new todo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Update the body class based on darkMode state
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleNewTodoChange(e) {
    setNewTodoValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    if (currentIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === currentIndex ? inputValue : todo
      );
      setTodos(updatedTodos);
      setCurrentIndex(null);
    } else {
      setTodos([...todos, newTodoValue]);
    }

    setInputValue('');
    setNewTodoValue('');
    closeModal();
  }

  function handleDelete(index) {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }

  function handleEdit(index) {
    setInputValue(todos[index]);
    setCurrentIndex(index);
    openModal();
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setInputValue('');
    setCurrentIndex(null);
  }

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">

        <div className={`p-6 max-w-3xl mx-auto ${darkMode ? 'dark' : ''}`}>
          <div className="flex items-center justify-end mb-6">
            <label htmlFor="theme-toggle" className="mr-3 text-gray-800 dark:text-white"></label>
            <div className="relative">
              <input
                type="checkbox"
                id="theme-toggle"
                checked={darkMode}
                className="sr-only"
              />
              <div
                onClick={toggleTheme}
                className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer transition-colors"
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${darkMode ? 'translate-x-6' : ''
                    }`}
                ></div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Todo List</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newTodoValue.trim() === '') return;
              setTodos([...todos, newTodoValue]);
              setNewTodoValue('');
            }}
            className="mb-4 flex gap-2 dark:text-white"
          >
            <input
              type="text"
              value={newTodoValue}
              onChange={handleNewTodoChange}
              placeholder=" Enter a todo"
              className="border rounded-lg flex-grow dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Add Todo
            </button>
          </form>
          <ul className="space-y-2">
            {todos.map((todo, index) => (
              <Todos key={index} todo={todo} index={index} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </ul>

          {/* Modal */}
          {isModalOpen && (<Modal handleSubmit={handleSubmit} inputValue={inputValue}
            handleChange={handleChange} closeModal={closeModal} />)}
        </div>
      </div>
    </div>
  );
}

export default TodoList;