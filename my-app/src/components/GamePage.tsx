import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import photo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import RandomGenerator from './RandomGenerator';
const GamePage: React.FC = () => {
  interface Game {
    title: string;
    minNumberOfGamers: number;
    maxNumberOfGamers: number;
    numberOfGamers: number;
    age: number;
  }
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const loadWasm = async () => {
      const script = document.createElement('script');
      script.src = '/hello.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const checkModule = setInterval(() => {
          const module = (window as any).Module;
          if (module && module.cwrap) {
            clearInterval(checkModule);
            const byId = module.cwrap('wypisaniePoId', 'string', []);
            const byAlphabet = module.cwrap('sortingByAlphabet', 'string', []);
            const byAge = module.cwrap('sortingByAge', 'string', []);
            const byMaxPlayers = module.cwrap('sortingByMaxNumberOfGamers', 'string', []);
            const byMinPlayers = module.cwrap('sortingByMinNumberOfGamers', 'string', []);
            const byNumberOfGamers = module.cwrap('sortingByNumberOfGamers', 'string', []);
            function handleResult(jsonString: string) {
              const parsed = JSON.parse(jsonString);
              setGames(parsed);
            }

            document.getElementById('byId')!.onclick = () => {
              handleResult(byId());
            };
            document.getElementById('byAlphabet')!.onclick = () => {
              handleResult(byAlphabet());
            };
            document.getElementById('byAge')!.onclick = () => {
              handleResult(byAge());
            };
            document.getElementById('byMaxPlayers')!.onclick = () => {
              handleResult(byMaxPlayers());
            };
            document.getElementById('byMinPlayers')!.onclick = () => {
              handleResult(byMinPlayers());
            };
            document.getElementById('byNumberOfGamers')!.onclick = () => {
              handleResult(byNumberOfGamers());
            }
          }
        }, 100);
      };
    };

    loadWasm();
  }, []);


  return (
    <>
      <Helmet>
        <title>Game Page - SpyroNet</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,100..900;1,100..900&display=swap" />
      </Helmet>

      <div>
        <header>
          <section className="logo-section"><img src={photo} alt="logo" className="logo-image" /></section>
          <section className="happy-worker-section"><p>Happy worker of the day: </p><RandomGenerator /></section>
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
          <section className="main-section">
            <h1>Game Reservation</h1>
            <p>Here you can reserve boardgames</p>
            <br />

            <section className="button-section">
              <button id="byId">by ID</button>
              <button id="byAlphabet">by alphabet</button>
              <button id="byAge">by age</button>
              <button id="byMinPlayers">by min number of players</button>
              <button id="byMaxPlayers">by max number of players</button>
              <button id="byNumberOfGamers">by number of players</button>
            </section>

            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Number of players</th>
                  <th>Recommended age</th>
                </tr>
              </thead>
              <tbody>

                {games.map((game, index) => (
                  <tr key={index}>
                    <td>{game.title}</td>
                    <td>{game.minNumberOfGamers} - {game.maxNumberOfGamers}</td>
                    <td>{game.age}+</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </section>



        </main>
        <footer>by Katarzyna Dabrowska & Kaja Wojcik</footer>
      </div>
    </>
  );

};
export default GamePage;