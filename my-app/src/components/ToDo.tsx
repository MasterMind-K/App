import photo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import RandomGenerator from './RandomGenerator';
import React, { useEffect, useState } from 'react';


const ToDo: React.FC = () => {

  const [tasks, setTasks] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [doneTasks, setDoneTasks] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTask = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);


  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]);
      setInputValue('');
      setIsOpen(false);
    }
  };


  const handleDelBtn = (indexToDelete: number) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const handleDoneBtn = (doneIndex: number) => {
    const taskToMove = tasks[doneIndex];
    setDoneTasks([...doneTasks, taskToMove]);
    setTasks(tasks.filter((_, index) => index !== doneIndex));
  };

  const handleUndoBtn = (doneIndex: number) => {
    const taskToMove = doneTasks[doneIndex];
    setTasks([...tasks, taskToMove]);
    setDoneTasks(doneTasks.filter((_, index) => index !== doneIndex));
  };

  const handleEditBtn = (index: number) => {
    setEditIndex(index);
    setEditValue(tasks[index]);
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  }

  const handleEditClose = (index: number) => {
    setEditIndex(index);
    setEditValue('');
  };


  const handleEditSave = () => {
    if (editIndex !== null && editValue.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editValue;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditValue('');
    }
  };


  return (
    <div>
      <header>
        <section className="logo-section"><img src={photo} alt="logo" className="logo-image" /></section>
        <section className="happy-worker-section"> <h3>Happy worker of the day:<RandomGenerator /> </h3></section>
      </header>

      <nav>
        <ul className='nav-links'>
          <li className='links'><Link to="/">Home</Link></li>
          <li className='links'><Link to="/ToDo-List">To Do List</Link></li>
          <li className='links'><Link to="/Quiz">Quiz</Link></li>
          <li className='links'><Link to="/game">Games reservation</Link></li>
          <li className='links'><Link to="/XO">XO Game</Link></li>
          <li className='links'><Link to="/expenses">Expenses Tracker</Link></li>
          <li className='links'><Link to="/t-shirts">Koszulki firmowe</Link></li>
        </ul>
      </nav>

      <main>
        <h1>To do list</h1>
        <button id="addTaskBtn" onClick={handleAddTask}>Add Task</button>

        <div className="inProgress">
          <h2>To do:</h2>
          {/* <label htmlFor="sortTasks">Sort by:</label>
                <select id="sortTasks" name='SortTasks'>
                  <option value="newest">newest</option>
                  <option value="oldest">oldest</option>
                  <option value="priority">priority</option>
                </select> */}

          {isOpen && (
            <div className="task">
              <h4>Task name:</h4>
              <input type="text" value={inputValue} onChange={handleChange} /> <br />
              <button className="delBtn" onClick={handleClose}>Close</button>
              <button className="delBtn" onClick={handleAdd}>Add</button>
            </div>
          )}

          {tasks.map((task, index) => (
            <div className="task" key={index}>
              {editIndex === index ? (
                <>
                  <input type="text" value={editValue} onChange={handleEditChange} />
                  <button onClick={() => handleEditClose(index)}>Close</button>
                  <button onClick={handleEditSave}>Change</button>
                </>
              ) : (
                <>
                  <p>{task}</p>
                  <button className="delBtn" onClick={() => handleDelBtn(index)}>Delete</button>
                  <button className="editBtn" onClick={() => handleEditBtn(index)} >Edit</button>
                  <button className="doneBtn" onClick={() => handleDoneBtn(index)}>Done</button>
                </>
              )}
            </div>
          ))}

        </div>
        <div className="done">
          <h2>Done:</h2>
          {doneTasks.map((task, index) => (
            <div className="task" key={index}>
              <p>{task}</p>
              <button className="doneBtn" onClick={() => handleUndoBtn(index)}>Undo</button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default ToDo;