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
            const wrapped = module.cwrap('wypisaniePoId', 'string', []);
            const jsonString = wrapped();
            const parsed = JSON.parse(jsonString);
            console.log("Parsed games:", parsed);
            parsed.forEach((g: Game) => {
              console.log("Max players for", g.title, ":", g.maxNumberOfGamers);
            });
            setGames(parsed);
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
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/random-generator">Random Generator</Link></li>
            <li><Link to="/game">Games reservation</Link></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>

        <main>
          <section className="main-section">
            <h1>Game Reservation</h1>
            <p>Here you can reserve a game board</p>
            <br />

            <section className="button-section">
              <button>Po ID</button>
              <button>Alfabetycznie</button>
              <button>Wg wieu graczy</button>
              <button>Wg maksymalnej liczby graczy</button>
              <button>Wg minimalnej liczby graczy</button>
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