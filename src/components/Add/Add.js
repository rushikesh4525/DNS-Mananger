import React, { useState } from 'react';

const Add= ({ addTodo }) => {
  const [newTitle, setNewTitle] = useState('');

  const handleAddTodo = () => { 
    addTodo(newTitle);
    setNewTitle('');
  };

  return (
    <div className="todo-input">
      <div className="todo-input-item">
        <label>DNS</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What is your DNS"
        />
      </div>
      <div className="todo-input-item">
        <button type="button" onClick={handleAddTodo} className="primary-button">
          Add
        </button>
      </div>
    </div>
  );
};

export default Add;
