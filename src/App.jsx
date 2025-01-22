import { useState } from 'react';
import Todos from './components/Todos';
import Modal from './components/Modal';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState(''); // For editing
  const [newTodoValue, setNewTodoValue] = useState(''); // For adding new todo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newTodoValue.trim() === '') return;
          setTodos([...todos, newTodoValue]);
          setNewTodoValue('');
        }}
        className="mb-4 flex gap-2"
      >
        <input
          type="text"
          value={newTodoValue}
          onChange={handleNewTodoChange}
          placeholder="Enter a todo"
          className="border rounded p-2 flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
  );
}

export default TodoList;