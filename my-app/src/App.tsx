import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RandomGenerator from './components/RandomGenerator';
import ToDo from './components/ToDo';
import Quiz from './components/Quiz';
import Game from './components/GamePage';
import Expenses from './components/Expences';
import Tshirts from './components/Tshirts';
import XO from './components/XO';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/random-generator" element={<RandomGenerator />} />
        <Route path="/toDo-List" element={<ToDo />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/game" element={<Game />} />
        <Route path="/XO" element={<XO />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/t-shirts" element={<Tshirts />} />
      </Routes>
    </Router>
  );
};

export default App;
