import photo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import RandomGenerator from './RandomGenerator';
import React, { useState } from 'react';
import questions from '../assets/questions.json';


const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);


  const toggleAnswer = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((o) => o !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  const checkAnswer = () => {
    const correct = questions[currentQuestion].answer;

    let isCorrect = false;

    if (Array.isArray(correct)) {
      isCorrect =
        selected.length === correct.length &&
        selected.every((opt) => correct.includes(opt));
    } else {
      isCorrect = selected.length === 1 && selected[0] === correct;
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
      console.log(score);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected([]);
    } else {
      setFinished(true);
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

      {!finished ? (
        <div className='quiz-container'>
          <h2>{questions[currentQuestion].question}</h2>
          <ul className='options-list'>
            {questions[currentQuestion].options.map((opt) => (
              <li className='option' key={opt}>
                <label>
                  <input
                    className='checkbox'
                    type="checkbox"
                    checked={selected.includes(opt)}
                    onChange={() => toggleAnswer(opt)}
                  />
                  <span>{opt}</span>
                </label>
              </li>
            ))}
          </ul>

          <button className='nextQuestion' onClick={checkAnswer}>Zatwierdź odpowiedź</button>
        </div>
      ) : (
        <h2>Twój wynik: {score} / {questions.length}</h2>
      )}
    </div>
  );
};

export default Quiz;