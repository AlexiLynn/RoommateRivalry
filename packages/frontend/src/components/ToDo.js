import React, { useState } from 'react';

const HardcodedTodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Take Out The Trash', completed: false },
    { id: 2, text: 'Vacuum', completed: false },
    { id: 3, text: 'Wash Dishes', completed: true },
  ]);

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
              style={{ marginRight: '8px' }}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HardcodedTodoList;
