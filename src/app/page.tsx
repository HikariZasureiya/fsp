'use client'
import React, { useState } from 'react';

interface TodoItemProps {
  item: { id: number; text: string };
  onDelete: () => void;
  onEdit: () => void;
}

function TodoItem({ item, onDelete, onEdit }: TodoItemProps) {
  return (
    <div className="bg-gray-200 p-4 flex justify-between items-center">
      <h2 className="text-lg">{item.text}</h2>
      <div className="flex">
        <button
          className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded mr-2"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-200 hover:bg-red-300 px-4 py-2 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

interface Todo {
  id: number;
  text: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    
  ]);

  const [newTodo, setNewTodo] = useState<string>("");


  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: todos.length + 1, text: newTodo }]);
      setNewTodo("");
    }
  };


  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };


  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-blue-300 h-[600px] w-[500px] flex flex-col">
        <div className="bg-red-300 flex justify-center items-center p-4">
          <h1 className="text-lg">TODO List</h1>
        </div>
        <div className="bg-red-300 flex justify-center items-center p-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="new element"
            className="text-lg p-[3px] border rounded-lg"
          />
          <button
            className="bg-gray-200 hover:bg-gray-300 ml-5 px-4 py-2 rounded"
            onClick={addTodo}
          >
            Add New
          </button>
        </div>

        <div className="w-full h-full overflow-y-scroll p-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              item={todo}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={() => {
                const newText = prompt("Enter new text:");
                if (newText) {
                  editTodo(todo.id, newText);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}