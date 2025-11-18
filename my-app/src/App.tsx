import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RandomGenerator from './components/RandomGenerator';
import GamePage from './components/GamePage';
import XO from './components/XO';
import Expenses from './components/Expences';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/random-generator" element={<RandomGenerator />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/XO" element={<XO />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </Router>
  );
};

export default App;
